import { json, type DataFunctionArgs, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../lib/styles/theme/index.ts';
import Layout from '~/lib/layout';
import {
  findLayerById,
  findOrCreateFirstLayer,
} from '~/models/layers/index.ts';
import FormColumn from '~/lib/layout/columns/FormColumn.tsx';
import CanvasColumn from '~/lib/layout/columns/CanvasColumn.tsx';

export async function loader({ request }: DataFunctionArgs) {
  const url = new URL(request.url);
  const layerId = url.searchParams.get('layerId');

  // if no layerId, find or create first layer
  if (!layerId) {
    const layer = await findOrCreateFirstLayer();
    if (!layer) {
      throw new Error('No layer found');
    }

    // then redirect to that layer
    return redirect(`/?layerId=${layer.id}`);
  }

  // if layerId, find layer
  const layer = await findLayerById(layerId);

  // if no layer, redirect to first layer
  if (!layer) {
    return redirect('/');
  }

  return json({ layer });
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const { layer } = data;
  console.log('layer', layer);

  return (
    <ChakraProvider resetCSS theme={theme}>
      <Layout>
        <FormColumn />
        <CanvasColumn />
      </Layout>
    </ChakraProvider>
  );
}
