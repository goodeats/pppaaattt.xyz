import { DataFunctionArgs, json, redirect } from '@remix-run/node';
import { NavLink, useLoaderData } from '@remix-run/react';
import { prisma } from '~/utils/db.server';
import {
  PaletteValuesRandomEditor,
  action,
} from './__input-values-random-editor';

export const handle = {
  breadcrumb: (match) => {
    const sizeId = match.params.sizeId;
    return (
      <NavLink to={`/dashboard/builder/design-attributes/size/${sizeId}`}>
        Edit Random Values
      </NavLink>
    );
  },
};
export { action };

export async function loader({ params }: DataFunctionArgs) {
  const { sizeId } = params;
  const palette = await prisma.designAttribute.findUnique({
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
          randomValues: true,
        },
      },
    },
  });

  if (!palette) {
    // TODO: redirect to 404 page
    // create toast notification
    // https://www.youtube.com/watch?v=N2yMZR6B31U
    return redirect(
      '/dashboard/builder/design-attributes/palette?notFound=true'
    );
  }

  return json({ palette });
}

export default function EditPaletteRandomValuesPage() {
  const data = useLoaderData<typeof loader>();
  const { palette } = data;
  const { inputParameters } = palette;
  const inputParameter = inputParameters[0];

  return (
    <PaletteValuesRandomEditor
      id={palette.id}
      inputParameter={inputParameter}
    />
  );
}
