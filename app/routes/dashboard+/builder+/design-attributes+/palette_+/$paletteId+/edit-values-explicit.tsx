import { DataFunctionArgs, json, redirect } from '@remix-run/node';
import { NavLink, useLoaderData } from '@remix-run/react';
import { prisma } from '~/utils/db.server';
import {
  PaletteValuesExplicitEditor,
  action,
} from './__input-values-explicit-editor';

export const handle = {
  breadcrumb: (match) => {
    const paletteId = match.params.paletteId;
    return (
      <NavLink to={`/dashboard/builder/design-attributes/palette/${paletteId}`}>
        Edit Explicit Values
      </NavLink>
    );
  },
};
export { action };

export async function loader({ params }: DataFunctionArgs) {
  const { paletteId } = params;
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
          explicitValues: true,
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

export default function EditPaletteExplicitValuesPage() {
  const data = useLoaderData<typeof loader>();
  const { palette } = data;
  const { inputParameters } = palette;
  const inputParameter = inputParameters[0];

  return (
    <PaletteValuesExplicitEditor
      id={palette.id}
      inputParameter={inputParameter}
    />
  );
}
