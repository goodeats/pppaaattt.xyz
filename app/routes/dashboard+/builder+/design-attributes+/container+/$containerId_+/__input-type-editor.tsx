import {
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
import { Form, useSubmit } from '@remix-run/react';
import { z } from 'zod';
import { InputParameter, prisma } from '~/utils/db.server';

const urlResourcePath = '/dashboard/builder/design-attributes/container';

enum InputType {
  explicit = 'explicit',
  random = 'random',
  range = 'range',
}
const InputTypeEnum = z.nativeEnum(InputType);
type InputTypeEnumType = z.infer<typeof InputTypeEnum>;

interface ContainerInputTypeEditorSchemaTypes {
  containerId: string;
  id: string;
  inputType: InputTypeEnumType;
}

const ContainerInputTypeEditorSchema: z.Schema<ContainerInputTypeEditorSchemaTypes> =
  z.object({
    containerId: z.string(),
    id: z.string(),
    inputType: InputTypeEnum,
  });

export async function action({ request }: DataFunctionArgs) {
  console.log('action!');
  const formData = await request.formData();
  const submission = await parse(formData, {
    schema: ContainerInputTypeEditorSchema.superRefine(async (data, ctx) => {
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

type ContainerEditorProps = {
  id: string;
  inputParameter: Pick<InputParameter, 'id' | 'inputType'>;
};

export function ContainerInputTypeEditor({
  id,
  inputParameter,
}: ContainerEditorProps) {
  const submit = useSubmit();
  // BUG: when navigating to /new this causes an infinite loop
  // Warning: Maximum update depth exceeded.
  // don't really need this right now, but will want to fix it later for other forms
  // const inputTypeFetcher = useFetcher<typeof action>();
  // const isPending = inputTypeFetcher.state !== 'idle';

  const [form, fields] = useForm<ContainerInputTypeEditorSchemaTypes>({
    id: 'container-input-type-editor',
    constraint: getFieldsetConstraint(ContainerInputTypeEditorSchema),
    // lastSubmission: inputTypeFetcher.data?.submission,
    onValidate({ formData }) {
      return parse(formData, { schema: ContainerInputTypeEditorSchema });
    },
    defaultValue: {
      inputType: inputParameter.inputType ?? '',
    },
  });

  const FormInputType = () => {
    const handleChange = () => {
      submit(form.ref.current);
    };

    return (
      <FormControl isInvalid={!!fields.inputType.error}>
        <FormLabel>Input Type</FormLabel>
        <RadioGroup
          name={fields.inputType.name}
          defaultValue={fields.inputType.defaultValue}
          onChange={handleChange}
        >
          <Radio value="explicit">Explicit</Radio>
          <Radio value="random">Random</Radio>
          <Radio value="range">Range</Radio>
        </RadioGroup>
        <FormErrorMessage>{fields.inputType.error}</FormErrorMessage>
      </FormControl>
    );
  };

  return (
    <Stack width="full" paddingX={8} paddingY={5}>
      <Form method="post" {...form.props}>
        <input type="hidden" name="containerId" value={id} />
        <input type="hidden" name="id" value={inputParameter.id} />

        <Stack spacing={5}>
          <FormInputType />
        </Stack>
      </Form>
    </Stack>
  );
}
