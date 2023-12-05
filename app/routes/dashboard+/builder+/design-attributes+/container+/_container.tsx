import { Box, Text, Flex, Button, Stack, CustomSidebar } from '~/components';
import { DataFunctionArgs, json } from '@remix-run/node';
import { NavLink, Outlet, useLoaderData } from '@remix-run/react';
import { prisma } from '~/utils/db.server';

export const handle = {
  breadcrumb: () => {
    return (
      <NavLink to={`/dashboard/builder/design-attributes/container`}>
        Container
      </NavLink>
    );
  },
};

export async function loader({ request }: DataFunctionArgs) {
  const containers = await prisma.designAttribute.findMany({
    where: {
      attributeType: {
        equals: 'container',
      },
    },
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return json({ containers });
}

export default function ContainerPage() {
  const data = useLoaderData<typeof loader>();
  const { containers } = data;

  const ContainerOverview = () => {
    return (
      <Box as="section" width="full" paddingX={8} paddingY={5}>
        <Stack textAlign="left">
          <Text fontSize="lg">Container Overview</Text>
          <Text fontSize="sm">Container count: {containers.length}</Text>
          <Text fontSize="sm">Container sets the dimensions of the canvas</Text>
        </Stack>
      </Box>
    );
  };

  const ContainerContent = () => {
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
      <ContainerOverview />
      <Flex flex={1} border="1px" borderColor="gray.300">
        <Flex flex={1}>
          <CustomSidebar items={containers} itemType="containers" />
          <ContainerContent />
        </Flex>
      </Flex>
      <Stack height={100} textAlign="left" paddingX={8} paddingY={5}>
        <NavLink to="new">
          <Button colorScheme="teal">New Container</Button>
        </NavLink>
      </Stack>
    </Flex>
  );
}
