import { DataFunctionArgs, json, redirect } from '@remix-run/node';
import { NavLink, Outlet } from '@remix-run/react';
import { prisma } from '~/utils/db.server';

export const handle = {
  breadcrumb: (match) => {
    const { data, params } = match;
    const paletteId = params.paletteId;
    const title = data.palette?.title ?? 'Palette';
    return (
      <NavLink to={`/dashboard/builder/design-attributes/palette/${paletteId}`}>
        {title}
      </NavLink>
    );
  },
};

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
      inputParameters: {
        select: {
          id: true,
          inputType: true,
          unitType: true,
          explicitValues: true,
          randomValues: true,
          rangeValues: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  if (!palette) {
    // TODO: redirect to 404 page
    // create toast notification
    return redirect(
      '/dashboard/builder/design-attributes/palette?notFound=true'
    );
  }

  return json({ palette });
}

export default function PaletteDetailsPage() {
  // TODO: add palette content on top of content
  return <Outlet />;
}
