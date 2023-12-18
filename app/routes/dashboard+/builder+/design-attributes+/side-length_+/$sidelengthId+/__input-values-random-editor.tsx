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
import { InputParameterPaletteRandomValuesType } from '~/utils/types/input-parameter/palette';
import { StringsToHexSchma } from '~/utils/zod-schema';

const urlResourcePath = '/dashboard/builder/design-attributes/palette';

enum InputTypeEnum {
  random = 'random',
}
const InputTypeEnumNative = z.nativeEnum(InputTypeEnum);
type InputTypeEnumType = z.infer<typeof InputTypeEnumNative>;

enum UnitTypeEnum {
  hexcode = 'hexcode',
}
const UnitTypeEnumNative = z.nativeEnum(UnitTypeEnum);
type UnitTypeEnumType = z.infer<typeof UnitTypeEnumNative>;

interface PaletteValuesRandomEditorSchemaTypes {
  paletteId: string;
  id: string;
  inputType: InputTypeEnumType;
  unitType: UnitTypeEnumType;
  hexcode: number;
}

const PaletteValuesRandomEditorSchema: z.Schema<PaletteValuesRandomEditorSchemaTypes> =
  z.object({
    paletteId: z.string(),
    id: z.string(),
    inputType: InputTypeEnumNative,
    unitType: UnitTypeEnumNative,
    hexcode: z.number(),
  });

export async function action({ request }: DataFunctionArgs) {
  const formData = await request.formData();
  const submission = await parse(formData, {
    schema: PaletteValuesRandomEditorSchema.superRefine(async (data, ctx) => {
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

  const {
    id: inputParameterId,
    unitType,
    paletteId,
    hexcode,
  } = submission.value;

  const currentInputParameter = await prisma.inputParameter.findUnique({
    where: {
      id: inputParameterId,
    },
    select: {
      randomValues: true,
    },
  });
  if (!currentInputParameter) {
    return json({ status: 'error', submission } as const, { status: 400 });
  }

  // Ensure randomValues is treated as an object
  const currentValues = currentInputParameter.randomValues || [];
  if (Array.isArray(currentValues)) {
    // Handle the case where randomValues is not an array
    return json({ status: 'error', submission } as const, { status: 400 });
  }

  const hexcodeArray =
    typeof hexcode === 'string' ? hexcode.split(',') : hexcode;

  const newValues = {
    [unitType]: hexcodeArray,
  };

  const updatedValues = newValues;

  const updatedInputParameter = await prisma.inputParameter.update({
    where: { id: inputParameterId },
    data: {
      randomValues: updatedValues,
    },
  });

  if (!updatedInputParameter) {
    return json({ status: 'error', submission } as const, { status: 400 });
  }

  return redirect(`${urlResourcePath}/${paletteId}`);
}

type PaletteValuesRandomEditorProps = {
  id: string;
  inputParameter: Pick<
    IInputParameter,
    'id' | 'inputType' | 'unitType' | 'randomValues'
  >;
};

export function PaletteValuesRandomEditor({
  id,
  inputParameter,
}: PaletteValuesRandomEditorProps) {
  const { unitType } = inputParameter;
  const unitTypeDisplay = UnitTypeEnum[unitType as 'hexcode'];
  const unitKey = unitType as keyof typeof UnitTypeEnum;
  const values =
    inputParameter.randomValues as InputParameterPaletteRandomValuesType;
  const currentValues = values[unitKey];

  // BUG: when navigating to /new this causes an infinite loop
  // Warning: Maximum update depth exceeded.
  // don't really need this right now, but will want to fix it later for other forms
  // const inputTypeFetcher = useFetcher<typeof action>();
  // const isPending = inputTypeFetcher.state !== 'idle';

  const [form, fields] = useForm<PaletteValuesRandomEditorSchemaTypes>({
    id: 'palette-values-random-editor',
    constraint: getFieldsetConstraint(PaletteValuesRandomEditorSchema),
    // lastSubmission: inputTypeFetcher.data?.submission,
    onValidate({ formData }) {
      return parse(formData, { schema: PaletteValuesRandomEditorSchema });
    },
    defaultValue: {
      hexcode: currentValues ?? 4,
    },
  });

  const FormHexCode = () => {
    return (
      <FormControl isInvalid={!!fields.hexcode.error}>
        <FormLabel>Colors ({unitTypeDisplay})</FormLabel>
        <Input
          type="number"
          name={fields.hexcode.name}
          defaultValue={fields.hexcode.defaultValue}
        />
        <FormErrorMessage>{fields.hexcode.error}</FormErrorMessage>
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
        <input type="hidden" name="paletteId" value={id} />
        <input type="hidden" name="id" value={inputParameter.id} />
        <input
          type="hidden"
          name="inputType"
          value={inputParameter.inputType}
        />
        <input type="hidden" name="unitType" value={inputParameter.unitType} />

        <Stack divider={<StackDivider borderColor="gray.200" />} spacing={5}>
          <FormHexCode />
          <FormActions />
        </Stack>
      </Form>
    </Stack>
  );
}
