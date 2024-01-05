import { DataFunctionArgs, json, redirect } from '@remix-run/node';
import { NavLink, Outlet } from '@remix-run/react';
import { prisma } from '~/utils/db.server';

export const handle = {
  breadcrumb: (match) => {
    const { data, params } = match;
    const sizeId = params.sizeId;
    const title = data.size?.title ?? 'Side Length';
    return (
      <NavLink to={`/dashboard/builder/design-attributes/size/${sizeId}`}>
        {title}
      </NavLink>
    );
  },
};

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

  if (!size) {
    // TODO: redirect to 404 page
    // create toast notification
    return redirect('/dashboard/builder/design-attributes/size?notFound=true');
  }

  return json({ size });
}

export default function SizeDetailsPage() {
  // TODO: add size content on top of content
  return <Outlet />;
}
