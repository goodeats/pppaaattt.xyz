import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  StackDivider,
} from '~/components';
import { useForm } from '@conform-to/react';
import { getFieldsetConstraint, parse } from '@conform-to/zod';
import { DataFunctionArgs, json, redirect } from '@remix-run/node';
import { Form, NavLink } from '@remix-run/react';
import { z } from 'zod';
import { IInputParameter, prisma } from '~/utils/db.server';
import { InputParameterSizeExplicitValuesType } from '~/utils/types/input-parameter/size';

const urlResourcePath = '/dashboard/builder/design-attributes/size';

enum InputTypeEnum {
  explicit = 'explicit',
}
const InputTypeEnumNative = z.nativeEnum(InputTypeEnum);
type InputTypeEnumType = z.infer<typeof InputTypeEnumNative>;

enum UnitTypeEnum {
  px = 'px',
  percent = 'percent',
}
const UnitTypeEnumNative = z.nativeEnum(UnitTypeEnum);
type UnitTypeEnumType = z.infer<typeof UnitTypeEnumNative>;

enum UnitTypeDisplayEnum {
  px = 'px',
  percent = '%',
}

interface SizeValuesExplicitEditorSchemaTypes {
  sizeId: string;
  id: string;
  inputType: InputTypeEnumType;
  unitType: UnitTypeEnumType;
  size: number;
}

const SizeValuesExplicitEditorSchema: z.Schema<SizeValuesExplicitEditorSchemaTypes> =
  z.object({
    sizeId: z.string(),
    id: z.string(),
    inputType: InputTypeEnumNative,
    unitType: UnitTypeEnumNative,
    size: z.number(),
  });

export async function action({ request }: DataFunctionArgs) {
  const formData = await request.formData();
  const submission = await parse(formData, {
    schema: SizeValuesExplicitEditorSchema.superRefine(async (data, ctx) => {
      if (!data.id) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Input parameter not provided',
        });
      }

      const inputParameter = await prisma.inputParameter.findUnique({
        where: {
          id: data.id,
        },
      });
      if (!inputParameter) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Input parameter not found',
        });
      }
    }),
    async: true,
  });

  if (submission.intent !== 'submit') {
    return json({ status: 'idle', submission } as const);
  }

  if (!submission.value) {
    return json({ status: 'error', submission } as const, { status: 400 });
  }

  const { id: inputParameterId, unitType, sizeId, size } = submission.value;

  const currentInputParameter = await prisma.inputParameter.findUnique({
    where: {
      id: inputParameterId,
    },
    select: {
      explicitValues: true,
    },
  });
  if (!currentInputParameter) {
    return json({ status: 'error', submission } as const, { status: 400 });
  }

  // Ensure explicitValues is treated as an object
  const currentValues = currentInputParameter.explicitValues || {};
  if (typeof currentValues !== 'object' || Array.isArray(currentValues)) {
    // Handle the case where explicitValues is not an object
    return json({ status: 'error', submission } as const, { status: 400 });
  }

  const newData = {
    [unitType]: size,
  };

  const updatedExplicitValues = { ...currentValues, ...newData };

  const updatedInputParameter = await prisma.inputParameter.update({
    where: { id: inputParameterId },
    data: {
      explicitValues: updatedExplicitValues,
    },
  });

  if (!updatedInputParameter) {
    return json({ status: 'error', submission } as const, { status: 400 });
  }

  return redirect(`${urlResourcePath}/${sizeId}`);
}

type SizeValuesExplicitEditorProps = {
  id: string;
  inputParameter: Pick<
    IInputParameter,
    'id' | 'inputType' | 'unitType' | 'explicitValues'
  >;
};

export function SizeValuesExplicitEditor({
  id,
  inputParameter,
}: SizeValuesExplicitEditorProps) {
  const { unitType } = inputParameter;
  const unitTypeDisplay = UnitTypeDisplayEnum[unitType];
  const unitKey = unitType as keyof typeof UnitTypeEnum;
  const values =
    inputParameter.explicitValues as InputParameterSizeExplicitValuesType;
  const currentValues = values[unitKey];

  // BUG: when navigating to /new this causes an infinite loop
  // Warning: Maximum update depth exceeded.
  // don't really need this right now, but will want to fix it later for other forms
  // const inputTypeFetcher = useFetcher<typeof action>();
  // const isPending = inputTypeFetcher.state !== 'idle';

  const [form, fields] = useForm<SizeValuesExplicitEditorSchemaTypes>({
    id: 'size-values-explicit-editor',
    constraint: getFieldsetConstraint(SizeValuesExplicitEditorSchema),
    // lastSubmission: inputTypeFetcher.data?.submission,
    onValidate({ formData }) {
      return parse(formData, { schema: SizeValuesExplicitEditorSchema });
    },
    defaultValue: {
      size: currentValues ?? '',
    },
  });

  const FormSize = () => {
    return (
      <FormControl isInvalid={!!fields.size.error}>
        <FormLabel>Colors ({unitTypeDisplay})</FormLabel>
        <Input
          type="number"
          name={fields.size.name}
          defaultValue={fields.size.defaultValue}
        />
        <FormErrorMessage>{fields.size.error}</FormErrorMessage>
      </FormControl>
    );
  };

  const FormActions = () => {
    return (
      <Stack>
        <ButtonGroup>
          <Button type="submit">
            {/* <Button type="submit" disabled={isPending}> */}
            Submit
          </Button>
          <Button form={form.id} variant="outline" type="reset">
            Reset
          </Button>
          <NavLink to={`${urlResourcePath}/${id}`}>
            <Button variant="ghost">Cancel</Button>
          </NavLink>
        </ButtonGroup>
      </Stack>
    );
  };

  return (
    <Stack width="full" paddingX={8} paddingY={5}>
      <Form method="post" {...form.props}>
        <input type="hidden" name="sizeId" value={id} />
        <input type="hidden" name="id" value={inputParameter.id} />
        <input
          type="hidden"
          name="inputType"
          value={inputParameter.inputType}
        />
        <input type="hidden" name="unitType" value={inputParameter.unitType} />

        <Stack divider={<StackDivider borderColor="gray.200" />} spacing={5}>
          <FormSize />
          <FormActions />
        </Stack>
      </Form>
    </Stack>
  );
}
