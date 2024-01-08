import { DataFunctionArgs, json, redirect } from '@remix-run/node';
import { NavLink, useLoaderData } from '@remix-run/react';
import { prisma } from '~/utils/db.server';
import {
  SizeValuesExplicitEditor,
  action,
} from './__input-values-explicit-editor';

export const handle = {
  breadcrumb: (match) => {
    const sizeId = match.params.sizeId;
    return (
      <NavLink to={`/dashboard/builder/design-attributes/size/${sizeId}`}>
        Edit Explicit Values
      </NavLink>
    );
  },
};
export { action };

export async function loader({ params }: DataFunctionArgs) {
  const { sizeId } = params;
  const size = await prisma.designAttribute.findUnique({
    where: {
      id: sizeId,
    },
    select: {
      id: true,
      title: true,
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

  if (!size) {
    // TODO: redirect to 404 page
    // create toast notification
    // https://www.youtube.com/watch?v=N2yMZR6B31U
    return redirect('/dashboard/builder/design-attributes/size?notFound=true');
  }

  return json({ size });
}

export default function EditSizeExplicitValuesPage() {
  const data = useLoaderData<typeof loader>();
  const { size } = data;
  const { inputParameters } = size;
  const inputParameter = inputParameters[0];

  return (
    <SizeValuesExplicitEditor id={size.id} inputParameter={inputParameter} />
  );
}
