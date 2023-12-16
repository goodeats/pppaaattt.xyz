import { DataFunctionArgs, json, redirect } from '@remix-run/node';
import { NavLink, useLoaderData } from '@remix-run/react';
import { prisma } from '~/utils/db.server';
import { PaletteEditor, action } from './../__palette-editor';

// BUG: this removes the id breadcrumb
export const handle = {
  breadcrumb: (match) => {
    const { data, params } = match;
    const paletteId = params.paletteId;
    const title = data.palette?.title ?? 'Palette';
    return (
      <NavLink to={`/dashboard/builder/design-attributes/palette/${paletteId}`}>
        Edit
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
      description: true,
      createdAt: true,
      updatedAt: true,
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

export default function PaletteEditPage() {
  const data = useLoaderData<typeof loader>();

  return <PaletteEditor palette={data.palette} />;
}
