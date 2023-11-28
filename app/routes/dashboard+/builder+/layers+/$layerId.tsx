import { DataFunctionArgs, json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { findLayerById } from '~/models/layers';

export async function loader({ params }: DataFunctionArgs) {
  const { layerId } = params;
  if (!layerId) {
    return redirect('/layers');
  }

  const layer = await findLayerById(layerId);
  return json({ layer });
}

export default function LayerDetailsPage() {
  const data = useLoaderData<typeof loader>();
  const { layer } = data;
  console.log(layer);
  return (
    <div>
      <p>{layer.id}</p>
      <p>{layer.title}</p>
    </div>
  );
}
