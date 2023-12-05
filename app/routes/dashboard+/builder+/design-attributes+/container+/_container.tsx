import {
  Box,
  Text,
  Flex,
  useColorModeValue,
  Button,
  Stack,
} from '~/components';
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

  const ContainerList = () => {
    const bg = useColorModeValue('gray.200', 'gray.600');
    const bgHover = useColorModeValue('gray.300', 'gray.700');

    return (
      <Box
        width={200}
        as="aside"
        paddingY={22}
        bg={bg}
        border="1px"
        borderColor="gray.300"
      >
        <Box as="nav" aria-label="Main navigation">
          {containers.length === 0 && (
            <Box as="p" padding={2}>
              No containers found.
            </Box>
          )}
          <Box as="ul" listStyleType="none" margin={0} padding={0}>
            {containers.map((container, i) => {
              const { id, title } = container;
              return (
                <Box as="li" key={i}>
                  <NavLink to={id}>
                    <Box
                      paddingX={8}
                      paddingY={2}
                      _hover={{ bg: bgHover }}
                      transition="background-color 0.2s ease-in-out"
                    >
                      {title}
                    </Box>
                  </NavLink>
                </Box>
              );
            })}
          </Box>
        </Box>
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
          <ContainerList />
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
