import { DataFunctionArgs, json, redirect } from '@remix-run/node';
import { NavLink, useLoaderData } from '@remix-run/react';
import { prisma } from '~/utils/db.server';
import { LayerImageEditor, action } from './__layer-image-editor';

// BUG: this removes the id breadcrumb
export const handle = {
  breadcrumb: (match) => {
    const { data, params } = match;
    const layerId = params.layerId;
    const title = data.layer?.title ?? 'Layer';
    return (
      <NavLink to={`/dashboard/builder/layers/${layerId}`}>
        {title} (Edit Image)
      </NavLink>
    );
  },
};

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
    include: {
      image: true,
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

export default function LayerEditImagePage() {
  const data = useLoaderData<typeof loader>();
  const { layer } = data;

  return <LayerImageEditor layer={layer} image={layer.image} />;
}
