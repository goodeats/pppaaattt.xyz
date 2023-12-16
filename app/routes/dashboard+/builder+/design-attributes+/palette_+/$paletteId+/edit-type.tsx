import { DataFunctionArgs, json, redirect } from '@remix-run/node';
import { NavLink, useLoaderData } from '@remix-run/react';
import { prisma } from '~/utils/db.server';
import { PaletteInputTypeEditor, action } from './__input-type-editor';

export const handle = {
  breadcrumb: (match) => {
    const paletteId = match.params.paletteId;
    return (
      <NavLink to={`/dashboard/builder/design-attributes/palette/${paletteId}`}>
        Edit Type
      </NavLink>
    );
  },
};
export { action };

export async function loader({ params }: DataFunctionArgs) {
  const { paletteId } = params;
  if (!paletteId) {
    return redirect('/dashboard/builder/design-attributes/palette');
  }

  const palette = await prisma.designAttribute.findUnique({
    where: {
      id: paletteId,
    },
    select: {
      id: true,
      title: true,
      inputParameters: {
        select: {
          id: true,
          inputType: true,
          unitType: true,
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

export default function PaletteInputParameterTypesEditPage() {
  const data = useLoaderData<typeof loader>();
  const { palette } = data;
  const { inputParameters } = palette;
  const inputParameter = inputParameters[0];

  return (
    <PaletteInputTypeEditor id={palette.id} inputParameter={inputParameter} />
  );
}
