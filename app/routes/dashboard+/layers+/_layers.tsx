import { Box, ChakraProvider, Flex, useColorModeValue } from '@chakra-ui/react';
import Layout from '~/lib/layout';
import { DataFunctionArgs, json } from '@remix-run/node';
import Column from '~/lib/layout/Column.tsx';
import { ColumnHeading } from '~/lib/layout/columns/_shared.tsx';
import { theme } from '~/lib/styles/theme';
import { findLayers } from '~/models/layers';
import { NavLink, Outlet, useLoaderData } from '@remix-run/react';

export async function loader({ request }: DataFunctionArgs) {
  const url = new URL(request.url);
  console.log(url);
  const layers = await findLayers();
  return json({ layers });
}

export default function LayersPage() {
  const data = useLoaderData<typeof loader>();
  const { layers } = data;
  console.log(layers);

  const LayersSidebar = () => {
    const bg = useColorModeValue('gray.200', 'gray.600');
    return (
      <Box width={200} as="aside" paddingY={22} bg={bg}>
        <Box as="nav" aria-label="Main navigation">
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
    <>
      <ColumnHeading>Layers</ColumnHeading>
      <Flex flex={1}>
        <LayersSidebar />
        <LayersContent />
      </Flex>
      {/* <LayerCard depth={0} /> */}
    </>
  );
}
