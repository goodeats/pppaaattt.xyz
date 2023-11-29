import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import { Form, useFetcher } from '@remix-run/react';
import { useForm } from '@conform-to/react';
import { getFieldsetConstraint, parse } from '@conform-to/zod';
import { z } from 'zod';
import {
  DataFunctionArgs,
  SerializeFrom,
  json,
  redirect,
} from '@remix-run/node';
import { Layer } from '@prisma/client';
import { prisma } from '~/utils/db.server';

const titleMinLength = 1;
const titleMaxLength = 100;
// const descriptionMinLength = 1;
// const descriptionMaxLength = 10000;

interface LayerEditorSchemaTypes {
  id?: string;
  title: string;
}

const LayerEditorSchema: z.Schema<LayerEditorSchemaTypes> = z.object({
  id: z.string().optional(),
  title: z.string().min(titleMinLength).max(titleMaxLength),
  // description: z.string().min(descriptionMinLength).max(descriptionMaxLength),
});

export async function action({ request }: DataFunctionArgs) {
  const formData = await request.formData();
  const submission = await parse(formData, {
    schema: LayerEditorSchema.superRefine(async (data, ctx) => {
      if (!data.id) return;

      const layer = await prisma.layer.findUnique({
        where: {
          id: data.id,
        },
      });
      if (!layer) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Layer not found',
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

  const { id: layerId, title } = submission.value;
  const layer = await prisma.layer.upsert({
    where: { id: layerId ?? '__new_layer__' },
    create: {
      title,
    },
    update: {
      title,
    },
  });

  if (!layer) {
    return json({ status: 'error', submission } as const, { status: 400 });
  }

  return redirect(`/dashboard/builder/layers/${layer.id}`);
}

export function LayerEditor({
  layer,
}: {
  layer?: SerializeFrom<Pick<Layer, 'id' | 'title' | 'description'>>;
}) {
  // BUG: when navigating to /new this causes an infinite loop
  // Warning: Maximum update depth exceeded.
  // don't really need this right now, but will want to fix it later for other forms
  // const layerFetcher = useFetcher<typeof action>();
  // const isPending = layerFetcher.state !== 'idle';

  const [form, fields] = useForm<LayerEditorSchemaTypes>({
    id: 'layer-editor',
    constraint: getFieldsetConstraint(LayerEditorSchema),
    // lastSubmission: layerFetcher.data?.submission,
    onValidate({ formData }) {
      return parse(formData, { schema: LayerEditorSchema });
    },
    defaultValue: {
      title: layer?.title ?? '',
      description: layer?.description ?? '',
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
        <FormErrorMessage>Error: {fields.title.error}</FormErrorMessage>
      </FormControl>
    );
  };

  const FormSubmit = () => {
    return (
      <Stack>
        <Button type="submit">
          {/* <Button type="submit" disabled={isPending}> */}
          Submit
        </Button>
      </Stack>
    );
  };

  return (
    <Stack width="full" paddingX={8} paddingY={5}>
      <Form method="post" {...form.props}>
        {/* if editing, include id in hidden field */}
        {layer ? <input type="hidden" name="id" value={layer.id} /> : null}

        <Stack spacing={5}>
          <FormTitle />
          <FormSubmit />
        </Stack>
      </Form>
    </Stack>
  );
}
