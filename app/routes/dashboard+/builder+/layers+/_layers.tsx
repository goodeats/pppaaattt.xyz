import { Box, Text, Flex, Button, Stack, CustomSidebar } from '~/components';
import { DataFunctionArgs, json } from '@remix-run/node';
import { NavLink, Outlet, useLoaderData } from '@remix-run/react';
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
      <Box as="section" width="full" paddingX={8} paddingY={5}>
        <Stack textAlign="left">
          <Text fontSize="lg">Layer Overview</Text>
          <Text fontSize="sm">Layer count: {layers.length}</Text>
        </Stack>
      </Box>
    );
  };

  const LayersContent = () => {
    return (
      <Flex flex="1" width="full" paddingY={22} borderRadius={6}>
        <Flex flex="1" width="full">
          <Outlet />
        </Flex>
      </Flex>
    );
  };

  return (
    <Flex flexDirection="column" minHeight="30vh">
      <LayerOverview />
      <Flex flex={1} border="1px" borderColor="gray.300">
        <Flex flex={1}>
          <CustomSidebar items={layers} itemType="layers" />
          <LayersContent />
        </Flex>
      </Flex>
      <Stack height={100} textAlign="left" paddingX={8} paddingY={5}>
        <NavLink to="new">
          <Button colorScheme="teal">New Layer</Button>
        </NavLink>
      </Stack>
    </Flex>
  );
}
