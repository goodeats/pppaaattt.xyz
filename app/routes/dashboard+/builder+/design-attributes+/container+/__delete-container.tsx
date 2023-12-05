import { Button } from '@chakra-ui/react';
import { Form, useFetcher } from '@remix-run/react';
import { useForm } from '@conform-to/react';
import { parse } from '@conform-to/zod';
import { z } from 'zod';
import { DataFunctionArgs, json, redirect } from '@remix-run/node';
import { prisma } from '~/utils/db.server';

interface DeleteFormSchemaTypes {
  intent: string;
  containerId: string;
}

const DeleteFormSchema: z.Schema<DeleteFormSchemaTypes> = z.object({
  intent: z.literal('delete-layer'),
  containerId: z.string(),
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

  const { containerId } = submission.value;

  const container = await prisma.designAttribute.findFirst({
    select: { id: true },
    where: { id: containerId },
  });
  if (!container) {
    return json({ status: 'error', submission } as const, { status: 404 });
  }

  await prisma.designAttribute.delete({
    where: { id: container.id },
  });

  return redirect(`/dashboard/builder/design-attributes/container`);
}

export function DeleteContainer({ id }: { id: string }) {
  // const actionData = useActionData<typeof action>();
  // const isPending = useIsPending();
  const [form] = useForm({
    id: 'delete-container',
    // lastSubmission: actionData?.submission,
  });

  return (
    <Form method="post" {...form.props}>
      <input type="hidden" name="containerId" value={id} />
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
