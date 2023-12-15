import {
  Box,
  Column,
  ColumnContainer,
  ContentContainer,
  Flex,
  LayerCard,
} from '~/components';
import { DataFunctionArgs, json, redirect } from '@remix-run/node';
import { NavLink, Outlet, useLoaderData } from '@remix-run/react';
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
      designAttributes: {
        select: {
          id: true,
          title: true,
          attributeType: true,
        },
      },
      _count: {
        select: { designAttributes: true },
      },
    },
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
        <LayerCard
          layer={{
            ...layer,
            createdAt: new Date(layer.createdAt),
            updatedAt: new Date(layer.updatedAt),
          }}
        />
      </Column>
    </ColumnContainer>
  );
}
