import { CanvasCard, Column, ColumnContainer, LayerCard } from '~/components';
import { DataFunctionArgs, json, redirect } from '@remix-run/node';
import { NavLink, useLoaderData } from '@remix-run/react';
import { prisma } from '~/utils/db.server';

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

  const query = await prisma.layer.findUnique({
    where: {
      id: layerId,
    },
    include: {
      designAttributes: {
        include: {
          designAttribute: {
            include: {
              inputParameters: true,
            },
          },
        },
      },
    },
  });

  if (!query) {
    // TODO: redirect to 404 page
    // create toast notification
    return redirect('/dashboard/generator/layers?notFound=true');
  }

  const layer = {
    ...query,
    // https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/working-with-many-to-many-relations#explicit-relations
    designAttributes: query.designAttributes.map(
      (attr) => attr.designAttribute
    ),
  };

  return json({ layer });
}

export default function LayerDetailsPage() {
  const data = useLoaderData<typeof loader>();
  const { layer } = data;
  const { buildAttributes, designAttributes } = layer;

  return (
    <ColumnContainer>
      <Column>
        <LayerCard
          layer={{
            ...layer,
            createdAt: new Date(layer.createdAt),
            updatedAt: new Date(layer.updatedAt),
          }}
        />
      </Column>
      <Column>
        <CanvasCard
          buildAttributes={buildAttributes ?? {}}
          designAttributes={designAttributes}
        />
      </Column>
    </ColumnContainer>
  );
}
