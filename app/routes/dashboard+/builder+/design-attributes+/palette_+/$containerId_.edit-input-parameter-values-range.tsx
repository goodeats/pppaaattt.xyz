import { DataFunctionArgs, json, redirect } from '@remix-run/node';
import { NavLink, useLoaderData } from '@remix-run/react';
import { prisma } from '~/utils/db.server';
import {
  ContainerInputParameterRangeValuesEditor,
  action,
} from './__input-parameter-values-range-editor';

export const handle = {
  breadcrumb: (match) => {
    const { data, params } = match;
    const containerId = params.containerId;
    const title = data.container?.title ?? 'Container';
    return (
      <NavLink
        to={`/dashboard/builder/design-attributes/container/${containerId}`}
      >
        {title} (Edit Input Parameter Range Values)
      </NavLink>
    );
  },
};

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
      inputParameters: {
        select: {
          id: true,
          inputType: true,
          unitType: true,
          rangeValues: true,
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

export default function ContainerInputParameterRangeValuesEditPage() {
  const data = useLoaderData<typeof loader>();
  const { container } = data;
  const { inputParameters } = container;
  const inputParameter = inputParameters[0];

  return (
    <ContainerInputParameterRangeValuesEditor
      id={container.id}
      inputParameter={inputParameter}
    />
  );
}
