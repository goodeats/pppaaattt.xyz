import { Stack, StackDivider, Text } from '@chakra-ui/react';
import { useLoaderData } from '@remix-run/react';
import { DataFunctionArgs, json, redirect } from '@remix-run/node';
import { prisma } from '~/utils/db.server';
import { ContainerInputTypeEditor, action } from './__input-type-editor';

export { action };

export async function loader({ params }: DataFunctionArgs) {
  const { containerId } = params;
  if (!containerId) {
    return redirect('/dashboard/builder/design-attributes/container');
  }

  const container = await prisma.designAttribute.findUnique({
    where: {
      id: containerId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      updatedAt: true,
      inputParameters: {
        select: {
          id: true,
          inputType: true,
          explicitValue: true,
          randomValues: true,
          minValue: true,
          maxValue: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  if (!container) {
    // TODO: redirect to 404 page
    // create toast notification
    // https://www.youtube.com/watch?v=N2yMZR6B31U
    return redirect(
      '/dashboard/builder/design-attributes/container?notFound=true'
    );
  }

  return json({ container });
}

export default function InputParameterPage() {
  const data = useLoaderData<typeof loader>();
  const { container } = data;
  const { id, inputParameters } = container;
  const inputParameter = inputParameters[0];

  return (
    <Stack divider={<StackDivider borderColor="gray.300" />}>
      <ContainerInputTypeEditor id={id} inputParameter={inputParameter} />
    </Stack>
  );
}
