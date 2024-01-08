import { DataFunctionArgs, json, redirect } from '@remix-run/node';
import { NavLink, useLoaderData } from '@remix-run/react';
import { prisma } from '~/utils/db.server';
import { SizeInputTypeEditor, action } from './__input-type-editor';

const urlResourcePath = '/dashboard/builder/design-attributes/size';

export const handle = {
  breadcrumb: (match) => {
    const sizeId = match.params.sizeId;
    return <NavLink to={`${urlResourcePath}/${sizeId}`}>Edit Type</NavLink>;
  },
};
export { action };

export async function loader({ params }: DataFunctionArgs) {
  const { sizeId } = params;
  if (!sizeId) {
    return redirect(urlResourcePath);
  }

  const size = await prisma.designAttribute.findUnique({
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
        },
      },
    },
  });

  if (!size) {
    // TODO: redirect to 404 page
    // create toast notification
    // https://www.youtube.com/watch?v=N2yMZR6B31U
    return redirect(`${urlResourcePath}?notFound=true`);
  }

  return json({ size });
}

export default function EditPaletteTypePage() {
  const data = useLoaderData<typeof loader>();
  const { size } = data;
  const { inputParameters } = size;
  const inputParameter = inputParameters[0];

  return <SizeInputTypeEditor id={size.id} inputParameter={inputParameter} />;
}
