import {
  Text,
  Flex,
  CustomSidebar,
  PageOverview,
  PageActions,
  PageContent,
  PageContentContainer,
} from '~/components';
import { DataFunctionArgs, json } from '@remix-run/node';
import { NavLink, useLoaderData } from '@remix-run/react';
import { prisma } from '~/utils/db.server';

export const handle = {
  breadcrumb: () => <NavLink to={'/dashboard/builder/layers'}>Layers</NavLink>,
};

export async function loader({ request }: DataFunctionArgs) {
  const layers = await prisma.layer.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return json({ layers });
}

export default function LayersPage() {
  const data = useLoaderData<typeof loader>();
  const { layers } = data;

  const LayerOverview = () => {
    return (
      <PageOverview title="Layers">
        <Text fontSize="sm">Layer count: {layers.length}</Text>
      </PageOverview>
    );
  };

  return (
    <Flex flexDirection="column" minHeight="30vh">
      <LayerOverview />
      <PageContentContainer>
        <CustomSidebar items={layers} itemType="layers" />
        <PageContent />
      </PageContentContainer>
      <PageActions itemName="Layer" />
    </Flex>
  );
}
