import { DataFunctionArgs, json, redirect } from '@remix-run/node';
import { NavLink, Outlet } from '@remix-run/react';
import { prisma } from '~/utils/db.server';

export const handle = {
  breadcrumb: (match) => {
    const { data, params } = match;
    const sidelengthId = params.sidelengthId;
    const title = data.sideLength?.title ?? 'Side Length';
    return (
      <NavLink
        to={`/dashboard/builder/design-attributes/sidelength/${sidelengthId}`}
      >
        {title}
      </NavLink>
    );
  },
};

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

  if (!sideLength) {
    // TODO: redirect to 404 page
    // create toast notification
    return redirect(
      '/dashboard/builder/design-attributes/side-length?notFound=true'
    );
  }

  return json({ sideLength });
}

export default function SideLengthDetailsPage() {
  // TODO: add sideLength content on top of content
  return <Outlet />;
}
