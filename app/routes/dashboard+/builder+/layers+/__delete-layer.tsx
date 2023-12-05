import { Button } from '~/components';
import { Form, useFetcher } from '@remix-run/react';
import { useForm } from '@conform-to/react';
import { parse } from '@conform-to/zod';
import { z } from 'zod';
import { DataFunctionArgs, json, redirect } from '@remix-run/node';
import { prisma } from '~/utils/db.server';

interface DeleteFormSchemaTypes {
  intent: string;
  layerId: string;
}

const DeleteFormSchema: z.Schema<DeleteFormSchemaTypes> = z.object({
  intent: z.literal('delete-layer'),
  layerId: z.string(),
});

export async function action({ request }: DataFunctionArgs) {
  const formData = await request.formData();
  const submission = parse(formData, {
    schema: DeleteFormSchema,
  });

  if (submission.intent !== 'submit') {
    return json({ status: 'idle', submission } as const);
  }

  if (!submission.value) {
    return json({ status: 'error', submission } as const, { status: 400 });
  }

  const { layerId } = submission.value;

  const layer = await prisma.layer.findFirst({
    select: { id: true },
    where: { id: layerId },
  });
  if (!layer) {
    return json({ status: 'error', submission } as const, { status: 404 });
  }

  await prisma.layer.delete({
    where: { id: layer.id },
  });

  return redirect(`/dashboard/builder/layers`);
}

export function DeleteLayer({ id }: { id: string }) {
  // const actionData = useActionData<typeof action>();
  // const isPending = useIsPending();
  const [form] = useForm({
    id: 'delete-layer',
    // lastSubmission: actionData?.submission,
  });

  return (
    <Form method="post" {...form.props}>
      <input type="hidden" name="layerId" value={id} />
      {/* TODO: make this an alert dialog
          https://chakra-ui.com/docs/components/alert-dialog */}
      <Button
        type="submit"
        name="intent"
        value="delete-layer"
        colorScheme="red"
      >
        Delete...
      </Button>
    </Form>
  );
}
