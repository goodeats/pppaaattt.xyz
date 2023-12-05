import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from '~/components';
import { useForm } from '@conform-to/react';
import { getFieldsetConstraint, parse } from '@conform-to/zod';
import { DataFunctionArgs, json, redirect } from '@remix-run/node';
import { Form, NavLink } from '@remix-run/react';
import { z } from 'zod';
import { InputParameter, prisma } from '~/utils/db.server';
import { InputParameterContainerRangeValuesType } from '~/utils/types/input-parameter/container';
import { RangeInputMinMaxToSchema } from '~/utils/zod-schema';

const urlResourcePath = '/dashboard/builder/design-attributes/container';

enum InputTypeEnum {
  explicit = 'explicit',
  random = 'random',
  range = 'range',
}
enum UnitTypeDisplayEnum {
  px = 'px',
  percent = '%',
}
const InputTypeEnumNative = z.nativeEnum(InputTypeEnum);
type InputTypeEnumType = z.infer<typeof InputTypeEnumNative>;

enum UnitTypeEnum {
  px = 'px',
  percent = 'percent',
}
const UnitTypeEnumNative = z.nativeEnum(UnitTypeEnum);
type UnitTypeEnumType = z.infer<typeof UnitTypeEnumNative>;

// TODO: make dynamic number inputs for each value
// there is a bit of work for that, but it will be a good project after MVP
// for now just use a string or comma separated numbers
// and validate from server side
// https://conform.guide/complex-structures#array
interface RangeValuesEditorSchemaTypes {
  containerId: string;
  id: string;
  inputType: InputTypeEnumType;
  unitType: UnitTypeEnumType;
  // string | number[] is a workaround for
  // string transforms to number[] in zod (see below)
  width: string | number[];
  height: string | number[];
  left: string | number[];
  top: string | number[];
}

const RangeValuesSchema: z.Schema<RangeValuesEditorSchemaTypes> = z.object({
  containerId: z.string(),
  id: z.string(),
  inputType: InputTypeEnumNative,
  unitType: UnitTypeEnumNative,
  width: RangeInputMinMaxToSchema('width'),
  height: RangeInputMinMaxToSchema('height'),
  left: RangeInputMinMaxToSchema('left'),
  top: RangeInputMinMaxToSchema('top'),
});

export async function action({ request }: DataFunctionArgs) {
  const formData = await request.formData();
  const submission = await parse(formData, {
    schema: RangeValuesSchema.superRefine(async (data, ctx) => {
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
    containerId,
    width,
    height,
    left,
    top,
  } = submission.value;

  const currentInputParameter = await prisma.inputParameter.findUnique({
    where: {
      id: inputParameterId,
    },
    select: {
      rangeValues: true,
    },
  });
  if (!currentInputParameter) {
    return json({ status: 'error', submission } as const, { status: 400 });
  }

  // Ensure rangeValues is treated as an object
  const currentValues = currentInputParameter.rangeValues || {};
  if (typeof currentValues !== 'object' || Array.isArray(currentValues)) {
    // Handle the case where rangeValues is not an object
    return json({ status: 'error', submission } as const, { status: 400 });
  }

  const newData = {
    [unitType]: {
      width,
      height,
      left,
      top,
    },
  };

  const updatedExplicitValues = { ...currentValues, ...newData };

  const updatedInputParameter = await prisma.inputParameter.update({
    where: { id: inputParameterId },
    data: {
      rangeValues: updatedExplicitValues,
    },
  });

  if (!updatedInputParameter) {
    return json({ status: 'error', submission } as const, { status: 400 });
  }

  return redirect(`${urlResourcePath}/${containerId}`);
}

type ContainerInputParameterEditorProps = {
  id: string;
  inputParameter: Pick<
    InputParameter,
    'id' | 'inputType' | 'unitType' | 'rangeValues'
  >;
};

export function ContainerInputParameterRangeValuesEditor({
  id,
  inputParameter,
}: ContainerInputParameterEditorProps) {
  // BUG: when navigating to /new this causes an infinite loop
  // Warning: Maximum update depth exceeded.
  // don't really need this right now, but will want to fix it later for other forms
  // const inputTypeFetcher = useFetcher<typeof action>();
  // const isPending = inputTypeFetcher.state !== 'idle';

  const { unitType } = inputParameter;
  const unitTypeDisplay = UnitTypeDisplayEnum[unitType];
  const unitKey = unitType as keyof typeof UnitTypeEnum;
  const values =
    inputParameter.rangeValues as InputParameterContainerRangeValuesType;
  const currentValues = values[unitKey];

  const [form, fields] = useForm<RangeValuesEditorSchemaTypes>({
    id: 'container-input-parameter-values-range-editor',
    constraint: getFieldsetConstraint(RangeValuesSchema),
    // lastSubmission: inputTypeFetcher.data?.submission,
    onValidate({ formData }) {
      return parse(formData, {
        schema: RangeValuesSchema,
      });
    },
    defaultValue: {
      width: currentValues?.width.toString() ?? '',
      height: currentValues?.height.toString() ?? '',
      left: currentValues?.left.toString() ?? '',
      top: currentValues?.top.toString() ?? '',
    },
  });

  const FormWidth = () => {
    return (
      <FormControl isInvalid={!!fields.width.error}>
        <FormLabel>range Width ({unitTypeDisplay})</FormLabel>
        <Input
          name={fields.width.name}
          defaultValue={fields.width.defaultValue}
        />
        <FormErrorMessage>{fields.width.error}</FormErrorMessage>
      </FormControl>
    );
  };

  const FormHeight = () => {
    return (
      <FormControl isInvalid={!!fields.height.error}>
        <FormLabel>Height ({unitTypeDisplay})</FormLabel>
        <Input
          name={fields.height.name}
          defaultValue={fields.height.defaultValue}
        />
        <FormErrorMessage>{fields.height.error}</FormErrorMessage>
      </FormControl>
    );
  };

  const FormLeft = () => {
    return (
      <FormControl isInvalid={!!fields.left.error}>
        <FormLabel>Left ({unitTypeDisplay})</FormLabel>
        <Input
          name={fields.left.name}
          defaultValue={fields.left.defaultValue}
        />
        <FormErrorMessage>{fields.left.error}</FormErrorMessage>
      </FormControl>
    );
  };

  const FormTop = () => {
    return (
      <FormControl isInvalid={!!fields.top.error}>
        <FormLabel>Top ({unitTypeDisplay})</FormLabel>
        <Input name={fields.top.name} defaultValue={fields.top.defaultValue} />
        <FormErrorMessage>{fields.top.error}</FormErrorMessage>
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
        <input type="hidden" name="containerId" value={id} />
        <input type="hidden" name="id" value={inputParameter.id} />
        <input
          type="hidden"
          name="inputType"
          value={inputParameter.inputType}
        />
        <input type="hidden" name="unitType" value={inputParameter.unitType} />

        <Stack spacing={5}>
          <FormWidth />
          <FormHeight />
          <FormLeft />
          <FormTop />

          <FormActions />
        </Stack>
      </Form>
    </Stack>
  );
}
