import {
  CanvasCard,
  Column,
  ColumnContainer,
  LayerCardGenerate,
} from '~/components';
import { DataFunctionArgs, json, redirect } from '@remix-run/node';
import { NavLink, useLoaderData } from '@remix-run/react';
import { prisma } from '~/utils/db.server';
import { BuildAttributes } from '~/lib/utils/build-structure/build-attributes';

export const handle = {
  breadcrumb: (match) => {
    const { data, params } = match;
    const layerId = params.layerId;
    const title = data.layer?.title ?? 'Layer';
    return (
      <NavLink to={`/dashboard/builder/layers/${layerId}`}>{title}</NavLink>
    );
  },
};

export async function loader({ params }: DataFunctionArgs) {
  const { layerId } = params;
  if (!layerId) {
    return redirect('/layers');
  }

  const layer = await prisma.layer.findUnique({
    where: { id: layerId },
  });

  if (!layer) {
    // TODO: redirect to 404 page
    // create toast notification
    return redirect('/dashboard/generator/layers?notFound=true');
  }

  return json({ layer });
}

export default function LayerDetailsPage() {
  const data = useLoaderData<typeof loader>();
  const { layer } = data;
  const { buildAttributes } = layer;

  return (
    <ColumnContainer>
      <Column>
        <LayerCardGenerate
          layer={{
            ...layer,
            createdAt: new Date(layer.createdAt),
            updatedAt: new Date(layer.updatedAt),
            designAttributes: [],
          }}
        />
      </Column>
      <Column>
        <CanvasCard buildAttributes={buildAttributes as BuildAttributes} />
      </Column>
    </ColumnContainer>
  );
}
