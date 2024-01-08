import { DataFunctionArgs, json, redirect } from '@remix-run/node';
import { NavLink, useLoaderData } from '@remix-run/react';
import { prisma } from '~/utils/db.server';
import { SizeEditor, action } from '../__size-editor';

export const handle = {
  breadcrumb: (match) => {
    const sizeId = match.params.sizeId;
    return (
      <NavLink to={`/dashboard/builder/design-attributes/size/${sizeId}`}>
        Edit
      </NavLink>
    );
  },
};
export { action };

export async function loader({ params }: DataFunctionArgs) {
  const { sizeId } = params;
  if (!sizeId) {
    return redirect('/dashboard/builder/design-attributes/size');
  }

  const size = await prisma.designAttribute.findUnique({
    where: {
      id: sizeId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      updatedAt: true,
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

export default function PaletteEditPage() {
  const data = useLoaderData<typeof loader>();

  return <SizeEditor size={data.size} />;
}
