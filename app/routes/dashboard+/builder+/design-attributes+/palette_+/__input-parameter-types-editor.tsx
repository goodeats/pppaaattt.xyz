import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  StackDivider,
} from '~/components';
import { useForm } from '@conform-to/react';
import { getFieldsetConstraint, parse } from '@conform-to/zod';
import { DataFunctionArgs, json, redirect } from '@remix-run/node';
import { Form, NavLink } from '@remix-run/react';
import { z } from 'zod';
import { InputParameter, prisma } from '~/utils/db.server';

const urlResourcePath = '/dashboard/builder/design-attributes/container';

enum InputTypeEnum {
  explicit = 'explicit',
  random = 'random',
  range = 'range',
}
const InputTypeEnumNative = z.nativeEnum(InputTypeEnum);
type InputTypeEnumType = z.infer<typeof InputTypeEnumNative>;

enum UnitTypeEnum {
  px = 'px',
  percent = 'percent',
}
const UnitTypeEnumNative = z.nativeEnum(UnitTypeEnum);
type UnitTypeEnumType = z.infer<typeof UnitTypeEnumNative>;

interface ContainerInputParameterEditorSchemaTypes {
  containerId: string;
  id: string;
  inputType: InputTypeEnumType;
  unitType: UnitTypeEnumType;
}

const ContainerInputParameterEditorSchema: z.Schema<ContainerInputParameterEditorSchemaTypes> =
  z.object({
    containerId: z.string(),
    id: z.string(),
    inputType: InputTypeEnumNative,
    unitType: UnitTypeEnumNative,
  });

export async function action({ request }: DataFunctionArgs) {
  const formData = await request.formData();
  const submission = await parse(formData, {
    schema: ContainerInputParameterEditorSchema.superRefine(
      async (data, ctx) => {
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
      }
    ),
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
    inputType,
    unitType,
    containerId,
  } = submission.value;
  const inputParameter = await prisma.inputParameter.update({
    where: { id: inputParameterId },
    data: {
      inputType,
      unitType,
    },
  });

  if (!inputParameter) {
    return json({ status: 'error', submission } as const, { status: 400 });
  }

  return redirect(`${urlResourcePath}/${containerId}`);
}

type ContainerInputParameterEditorProps = {
  id: string;
  inputParameter: Pick<InputParameter, 'id' | 'inputType' | 'unitType'>;
};

export function ContainerInputParameterTypesEditor({
  id,
  inputParameter,
}: ContainerInputParameterEditorProps) {
  // BUG: when navigating to /new this causes an infinite loop
  // Warning: Maximum update depth exceeded.
  // don't really need this right now, but will want to fix it later for other forms
  // const inputTypeFetcher = useFetcher<typeof action>();
  // const isPending = inputTypeFetcher.state !== 'idle';

  const [form, fields] = useForm<ContainerInputParameterEditorSchemaTypes>({
    id: 'container-input-type-editor',
    constraint: getFieldsetConstraint(ContainerInputParameterEditorSchema),
    // lastSubmission: inputTypeFetcher.data?.submission,
    onValidate({ formData }) {
      return parse(formData, { schema: ContainerInputParameterEditorSchema });
    },
    defaultValue: {
      inputType: inputParameter.inputType ?? '',
      unitType: inputParameter.unitType ?? '',
    },
  });

  const FormInputType = () => {
    const options: { value: string; label: string }[] = [
      { value: 'explicit', label: 'Explicit' },
      { value: 'random', label: 'Random' },
      { value: 'range', label: 'Range' },
    ];

    return (
      <Stack textAlign="left">
        <FormControl isInvalid={!!fields.inputType.error}>
          <FormLabel>Input Parameter Type</FormLabel>
          <RadioGroup
            name={fields.inputType.name}
            defaultValue={fields.inputType.defaultValue}
          >
            {options.map((option) => (
              <Radio key={option.value} value={option.value} marginRight={3}>
                {option.label}
              </Radio>
            ))}
          </RadioGroup>
          <FormErrorMessage>{fields.inputType.error}</FormErrorMessage>
        </FormControl>
      </Stack>
    );
  };

  const FormUnitType = () => {
    type OptionsType = { value: string; label: string };
    const options: OptionsType[] = [
      { value: 'px', label: 'Pixels' },
      { value: 'percent', label: 'Percentage' },
    ];

    return (
      <Stack textAlign="left">
        <FormControl isInvalid={!!fields.unitType.error}>
          <FormLabel>Unit Type</FormLabel>
          <RadioGroup
            name={fields.unitType.name}
            defaultValue={fields.unitType.defaultValue}
          >
            {options.map((option) => (
              <Radio key={option.value} value={option.value} marginRight={3}>
                {option.label}
              </Radio>
            ))}
          </RadioGroup>
          <FormErrorMessage>{fields.unitType.error}</FormErrorMessage>
        </FormControl>
      </Stack>
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

        <Stack divider={<StackDivider borderColor="gray.200" />} spacing={5}>
          <FormInputType />
          <FormUnitType />
          <FormActions />
        </Stack>
      </Form>
    </Stack>
  );
}
