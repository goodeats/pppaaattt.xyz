import { DataFunctionArgs, json, redirect } from '@remix-run/node';
import { NavLink, useLoaderData } from '@remix-run/react';
import { prisma } from '~/utils/db.server';
import { SideLengthEditor, action } from '../__side-length-editor';

export const handle = {
  breadcrumb: (match) => {
    const sidelengthId = match.params.sidelengthId;
    return (
      <NavLink
        to={`/dashboard/builder/design-attributes/side-length/${sidelengthId}`}
      >
        Edit
      </NavLink>
    );
  },
};
export { action };

export async function loader({ params }: DataFunctionArgs) {
  const { sidelengthId } = params;
  if (!sidelengthId) {
    return redirect('/dashboard/builder/design-attributes/side-length');
  }

  const sideLength = await prisma.designAttribute.findUnique({
    where: {
      id: sidelengthId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!sideLength) {
    // TODO: redirect to 404 page
    // create toast notification
    // https://www.youtube.com/watch?v=N2yMZR6B31U
    return redirect(
      '/dashboard/builder/design-attributes/side-length?notFound=true'
    );
  }

  return json({ sideLength });
}

export default function PaletteEditPage() {
  const data = useLoaderData<typeof loader>();

  return <SideLengthEditor sideLength={data.sideLength} />;
}
