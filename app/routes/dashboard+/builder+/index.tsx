import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import {
  Stack,
  Divider,
  Text,
  LayersTable,
  DesignAttributesTableBuilder,
} from '~/components';
import { prisma } from '~/utils/db.server';

export async function loader() {
  const layerCount = await prisma.layer.count();
  const layers = await prisma.layer.findMany({
    select: {
      id: true,
      title: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 3,
  });

  const designAttributesByCount = await prisma.designAttribute.groupBy({
    by: ['attributeType'],
    _count: {
      attributeType: true,
    },
  });

  const designAttributeCounts = designAttributesByCount.map(
    (designAttribute) => {
      const { attributeType, _count } = designAttribute;
      const count = _count.attributeType;
      return {
        attributeType,
        count,
      };
    }
  );

  return json({ layerCount, layers, designAttributeCounts });
}

export default function BuilderIndexPage() {
  const data = useLoaderData<typeof loader>();
  const { layerCount, layers, designAttributeCounts } = data;

  return (
    <Stack width="full" paddingX={8} paddingY={5} textAlign="left">
      <Text fontSize="medium">Latest Layers</Text>
      <LayersTable
        layers={layers.map((layer) => ({
          ...layer,
          createdAt: new Date(layer.createdAt),
        }))}
        layerCount={layerCount}
      />
      <Divider my={4} />
      <Text fontSize="medium">Design Attributes</Text>
      <DesignAttributesTableBuilder designAttributes={designAttributeCounts} />
    </Stack>
  );
}
