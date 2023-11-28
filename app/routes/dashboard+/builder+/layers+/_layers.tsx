import {
  Box,
  Text,
  Flex,
  useColorModeValue,
  Button,
  Stack,
} from '@chakra-ui/react';
import { DataFunctionArgs, json } from '@remix-run/node';
import { findLayers } from '~/models/layers';
import { NavLink, Outlet, useLoaderData } from '@remix-run/react';

export async function loader({ request }: DataFunctionArgs) {
  const layers = await findLayers();
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

  const LayersList = () => {
    const bg = useColorModeValue('gray.200', 'gray.600');
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
          {layers.length === 0 && (
            <Box as="p" padding={2}>
              No layers found.
            </Box>
          )}
          <Box as="ul" listStyleType="none" margin={0} padding={0}>
            {layers.map((layer, i) => (
              <Box as="li" key={i}>
                <NavLink to={layer.id}>📝 {layer.title}</NavLink>
              </Box>
            ))}
          </Box>
        </Box>
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
          <LayersList />
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