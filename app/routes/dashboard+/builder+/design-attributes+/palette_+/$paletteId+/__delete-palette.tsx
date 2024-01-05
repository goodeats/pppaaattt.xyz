import { Button } from '~/components';
import { Form, useFetcher } from '@remix-run/react';
import { useForm } from '@conform-to/react';
import { parse } from '@conform-to/zod';
import { z } from 'zod';
import { DataFunctionArgs, json, redirect } from '@remix-run/node';
import { prisma } from '~/utils/db.server';

interface DeleteFormSchemaTypes {
  intent: string;
  paletteId: string;
}

const DeleteFormSchema: z.Schema<DeleteFormSchemaTypes> = z.object({
  intent: z.literal('delete-palette'),
  paletteId: z.string(),
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

  const { paletteId } = submission.value;

  const palette = await prisma.designAttribute.findFirst({
    select: { id: true },
    where: { id: paletteId },
  });
  if (!palette) {
    return json({ status: 'error', submission } as const, { status: 404 });
  }

  await prisma.designAttribute.delete({
    where: { id: palette.id },
  });

  return redirect(`/dashboard/builder/design-attributes/palette`);
}

export function DeletePalette({ id }: { id: string }) {
  // const actionData = useActionData<typeof action>();
  // const isPending = useIsPending();
  const [form] = useForm({
    id: 'delete-palette',
    // lastSubmission: actionData?.submission,
  });

  return (
    <Form method="post" {...form.props}>
      <input type="hidden" name="paletteId" value={id} />
      {/* TODO: make this an alert dialog
          https://chakra-ui.com/docs/components/alert-dialog */}
      <Button
        type="submit"
        name="intent"
        value="delete-palette"
        colorScheme="red"
      >
        Delete...
      </Button>
    </Form>
  );
}
