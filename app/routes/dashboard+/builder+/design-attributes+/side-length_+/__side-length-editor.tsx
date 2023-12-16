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
import { InputParameterSideLengthDefault } from '~/utils/types/input-parameter/side-length';

const titleMinLength = 1;
const titleMaxLength = 100;
const descriptionMinLength = 1;
const descriptionMaxLength = 10000;
const urlResourcePath = '/dashboard/builder/design-attributes/side-length';

interface SideLengthEditorSchemaTypes {
  id?: string;
  title: string;
  description?: string;
}

const SideLengthEditorSchema: z.Schema<SideLengthEditorSchemaTypes> = z.object({
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
    schema: SideLengthEditorSchema.superRefine(async (data, ctx) => {
      if (!data.id) return;

      const sideLength = await prisma.designAttribute.findUnique({
        where: {
          id: data.id,
        },
      });
      if (!sideLength) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Side Length not found',
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

  const { id: sideLengthId, title, description } = submission.value;
  const designAttribute = await prisma.designAttribute.upsert({
    where: { id: sideLengthId ?? '__new_side_length__' },
    create: {
      title,
      description,
      attributeType: 'sideLength', // quick and dirty, no editing attribute type
      inputParameters: {
        // initialize with default input parameters
        create: InputParameterSideLengthDefault,
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

  console.log('designAttribute', designAttribute, urlResourcePath);

  return redirect(`${urlResourcePath}/${designAttribute.id}`);
}

type SideLengthEditorProps = {
  sideLength?: SerializeFrom<
    Pick<DesignAttribute, 'id' | 'title' | 'description'>
  >;
};

export function SideLengthEditor({ sideLength }: SideLengthEditorProps) {
  // BUG: when navigating to /new this causes an infinite loop
  // Warning: Maximum update depth exceeded.
  // don't really need this right now, but will want to fix it later for other forms
  // const layerFetcher = useFetcher<typeof action>();
  // const isPending = layerFetcher.state !== 'idle';

  const [form, fields] = useForm<SideLengthEditorSchemaTypes>({
    id: 'side-length-editor',
    constraint: getFieldsetConstraint(SideLengthEditorSchema),
    // lastSubmission: layerFetcher.data?.submission,
    onValidate({ formData }) {
      return parse(formData, { schema: SideLengthEditorSchema });
    },
    defaultValue: {
      title: sideLength?.title ?? '',
      description: sideLength?.description ?? '',
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
          {sideLength ? (
            <Button form={form.id} variant="outline" type="reset">
              Reset
            </Button>
          ) : null}
          {sideLength ? (
            <NavLink to={`${urlResourcePath}/${sideLength.id}`}>
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
        {sideLength ? (
          <input type="hidden" name="id" value={sideLength.id} />
        ) : null}

        <Stack spacing={5}>
          <FormTitle />
          <FormDescription />
          <FormActions />
        </Stack>
      </Form>
    </Stack>
  );
}
