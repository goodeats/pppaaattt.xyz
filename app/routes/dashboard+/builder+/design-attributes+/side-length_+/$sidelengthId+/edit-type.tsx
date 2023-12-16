import { DataFunctionArgs, json, redirect } from '@remix-run/node';
import { NavLink, useLoaderData } from '@remix-run/react';
import { prisma } from '~/utils/db.server';
import { SideLengthInputTypeEditor, action } from './__input-type-editor';

const urlResourcePath = '/dashboard/builder/design-attributes/side-length';

export const handle = {
  breadcrumb: (match) => {
    const sidelengthId = match.params.sidelengthId;
    return (
      <NavLink to={`${urlResourcePath}/${sidelengthId}`}>Edit Type</NavLink>
    );
  },
};
export { action };

export async function loader({ params }: DataFunctionArgs) {
  const { sidelengthId } = params;
  if (!sidelengthId) {
    return redirect(urlResourcePath);
  }

  const sideLength = await prisma.designAttribute.findUnique({
    where: {
      id: sidelengthId,
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

  if (!sideLength) {
    // TODO: redirect to 404 page
    // create toast notification
    // https://www.youtube.com/watch?v=N2yMZR6B31U
    return redirect(`${urlResourcePath}?notFound=true`);
  }

  return json({ sideLength });
}

export default function EditPaletteTypePage() {
  const data = useLoaderData<typeof loader>();
  const { sideLength } = data;
  const { inputParameters } = sideLength;
  const inputParameter = inputParameters[0];

  return (
    <SideLengthInputTypeEditor
      id={sideLength.id}
      inputParameter={inputParameter}
    />
  );
}
