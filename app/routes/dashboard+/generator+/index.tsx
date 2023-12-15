import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Stack, Text, LayersTable } from '~/components';
import { prisma } from '~/utils/db.server';

export async function loader() {
  const layers = await prisma.layer.findMany({
    where: {
      parentId: null,
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return json({ layers });
}

export default function GeneratorIndexPage() {
  const data = useLoaderData<typeof loader>();
  const { layers } = data;

  return (
    <Stack width="full" paddingX={8} paddingY={5} textAlign="left">
      <Text fontSize="medium">Layers ready for use in the generator</Text>
      <LayersTable
        caption={'Select a Layer'}
        navRoute="/dashboard/generator"
        layers={layers.map((layer) => ({
          ...layer,
          createdAt: new Date(layer.createdAt),
        }))}
      />
    </Stack>
  );
}
