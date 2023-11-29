import { DataFunctionArgs, json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { prisma } from '~/utils/db.server';
import { LayerEditor, action } from './__layer-editor';

export { action };

export async function loader({ params }: DataFunctionArgs) {
  const { layerId } = params;
  if (!layerId) {
    return redirect('/layers');
  }

  const layer = await prisma.layer.findUnique({
    where: {
      id: layerId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!layer) {
    // TODO: redirect to 404 page
    // create toast notification
    // https://www.youtube.com/watch?v=N2yMZR6B31U
    return redirect('/dashboard/builder/layers?notFound=true');
  }

  return json({ layer });
}

export default function LayerEditPage() {
  const data = useLoaderData<typeof loader>();

  return <LayerEditor layer={data.layer} />;
}
