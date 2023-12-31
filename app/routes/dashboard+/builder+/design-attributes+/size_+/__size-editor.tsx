import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Textarea,
} from '~/components';
import { useForm } from '@conform-to/react';
import { getFieldsetConstraint, parse } from '@conform-to/zod';
import {
  DataFunctionArgs,
  SerializeFrom,
  json,
  redirect,
} from '@remix-run/node';
import { Form, NavLink } from '@remix-run/react';
import { z } from 'zod';
import { DesignAttribute, prisma } from '~/utils/db.server';
import { InputParameterSizeDefault } from '~/utils/types/input-parameter/size';

const titleMinLength = 1;
const titleMaxLength = 100;
const descriptionMinLength = 1;
const descriptionMaxLength = 10000;
const urlResourcePath = '/dashboard/builder/design-attributes/size';

interface SizeEditorSchemaTypes {
  id?: string;
  title: string;
  description?: string;
}

const SizeEditorSchema: z.Schema<SizeEditorSchemaTypes> = z.object({
  id: z.string().optional(),
  title: z.string().min(titleMinLength).max(titleMaxLength),
  description: z
    .string()
    .min(descriptionMinLength)
    .max(descriptionMaxLength)
    .optional(),
});

export async function action({ request }: DataFunctionArgs) {
  const formData = await request.formData();
  const submission = await parse(formData, {
    schema: SizeEditorSchema.superRefine(async (data, ctx) => {
      if (!data.id) return;

      const size = await prisma.designAttribute.findUnique({
        where: {
          id: data.id,
        },
      });
      if (!size) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Size not found',
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

  const { id: SizeId, title, description } = submission.value;
  const designAttribute = await prisma.designAttribute.upsert({
    where: { id: SizeId ?? '__new_size__' },
    create: {
      title,
      description,
      attributeType: 'size', // quick and dirty, no editing attribute type
      inputParameters: {
        // initialize with default input parameters
        create: InputParameterSizeDefault,
      },
    },
    update: {
      title,
      description,
    },
  });

  if (!designAttribute) {
    return json({ status: 'error', submission } as const, { status: 400 });
  }

  return redirect(`${urlResourcePath}/${designAttribute.id}`);
}

type SizeEditorProps = {
  size?: SerializeFrom<Pick<DesignAttribute, 'id' | 'title' | 'description'>>;
};

export function SizeEditor({ size }: SizeEditorProps) {
  // BUG: when navigating to /new this causes an infinite loop
  // Warning: Maximum update depth exceeded.
  // don't really need this right now, but will want to fix it later for other forms
  // const layerFetcher = useFetcher<typeof action>();
  // const isPending = layerFetcher.state !== 'idle';

  const [form, fields] = useForm<SizeEditorSchemaTypes>({
    id: 'size-editor',
    constraint: getFieldsetConstraint(SizeEditorSchema),
    // lastSubmission: layerFetcher.data?.submission,
    onValidate({ formData }) {
      return parse(formData, { schema: SizeEditorSchema });
    },
    defaultValue: {
      title: size?.title ?? '',
      description: size?.description ?? '',
    },
  });

  const FormTitle = () => {
    return (
      <FormControl isInvalid={!!fields.title.error}>
        <FormLabel>Title</FormLabel>
        <Input
          name={fields.title.name}
          defaultValue={fields.title.defaultValue}
        />
        <FormErrorMessage>{fields.title.error}</FormErrorMessage>
      </FormControl>
    );
  };

  const FormDescription = () => {
    return (
      <FormControl isInvalid={!!fields.description.error}>
        <FormLabel>Description</FormLabel>
        <Textarea
          name={fields.description.name}
          defaultValue={fields.description.defaultValue}
        />
        <FormErrorMessage>{fields.description.error}</FormErrorMessage>
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
          {size ? (
            <Button form={form.id} variant="outline" type="reset">
              Reset
            </Button>
          ) : null}
          {size ? (
            <NavLink to={`${urlResourcePath}/${size.id}`}>
              <Button variant="ghost">Cancel</Button>
            </NavLink>
          ) : null}
        </ButtonGroup>
      </Stack>
    );
  };

  return (
    <Stack width="full" paddingX={8} paddingY={5}>
      <Form method="post" {...form.props}>
        {/* if editing, include id in hidden field */}
        {size ? <input type="hidden" name="id" value={size.id} /> : null}

        <Stack spacing={5}>
          <FormTitle />
          <FormDescription />
          <FormActions />
        </Stack>
      </Form>
    </Stack>
  );
}
