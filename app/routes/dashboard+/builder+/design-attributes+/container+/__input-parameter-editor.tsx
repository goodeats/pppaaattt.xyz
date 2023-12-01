import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
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

interface ContainerInputParameterEditorSchemaTypes {
  containerId: string;
  id: string;
  inputType: InputTypeEnumType;
}

const ContainerInputParameterEditorSchema: z.Schema<ContainerInputParameterEditorSchemaTypes> =
  z.object({
    containerId: z.string(),
    id: z.string(),
    inputType: InputTypeEnumNative,
  });

export async function action({ request }: DataFunctionArgs) {
  console.log('action!');
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
  console.log('submission!');

  if (submission.intent !== 'submit') {
    return json({ status: 'idle', submission } as const);
  }

  if (!submission.value) {
    return json({ status: 'error', submission } as const, { status: 400 });
  }

  const { id: inputParameterId, inputType, containerId } = submission.value;
  const inputParameter = await prisma.inputParameter.update({
    where: { id: inputParameterId },
    data: {
      inputType,
    },
  });
  console.log('update!');

  if (!inputParameter) {
    return json({ status: 'error', submission } as const, { status: 400 });
  }

  return redirect(`${urlResourcePath}/${containerId}`);
}

type ContainerInputParameterEditorProps = {
  id: string;
  inputParameter: Pick<InputParameter, 'id' | 'inputType'>;
};

export function ContainerInputParameterEditor({
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
    },
  });

  const FormInputType = () => {
    const handleChange = () => {
      // submit(form.ref.current);
      console.log('change!');
    };

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
            onChange={handleChange}
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

        <Stack spacing={5}>
          <FormInputType />
          <FormActions />
        </Stack>
      </Form>
    </Stack>
  );
}
