import { DataFunctionArgs, json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { prisma } from '~/utils/db.server';
import {
  ContainerInputParameterExplicitValuesEditor,
  action,
} from './__input-parameter-values-explicit-editor';

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
      inputParameters: {
        select: {
          id: true,
          inputType: true,
          unitType: true,
          explicitValues: true,
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

export default function ContainerInputParameterExplicitValuesEditPage() {
  const data = useLoaderData<typeof loader>();
  const { container } = data;
  const { inputParameters } = container;
  const inputParameter = inputParameters[0];

  return (
    <ContainerInputParameterExplicitValuesEditor
      id={container.id}
      inputParameter={inputParameter}
    />
  );
}
