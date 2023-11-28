import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Stack,
  StackDivider,
  useColorModeValue,
} from '@chakra-ui/react';
import { ColumnHeading } from '~/lib/layout/columns/_shared.tsx';
import { NavLink, Outlet } from '@remix-run/react';

export default function BuilderPage() {
  const navs = [
    { id: '', title: 'Overview' },
    { id: 'layers', title: 'Layers' },
  ];

  const NavGroup = () => {
    const bgHover = useColorModeValue('gray.300', 'gray.600');

    return (
      <Box as="nav" aria-label="Builder navigation">
        <ButtonGroup variant="outline">
          {navs.map((nav, i) => (
            <NavLink key={i} to={nav.id}>
              <Button
                _hover={{ bg: bgHover }}
                transition="background-color 0.2s ease-in-out"
              >
                {nav.title}
              </Button>
            </NavLink>
          ))}
        </ButtonGroup>
      </Box>
    );
  };

  return (
    <>
      <ColumnHeading>Builder</ColumnHeading>
      <Flex flex={1} flexDirection="column">
        <Stack divider={<StackDivider borderColor="gray.300" />}>
          <NavGroup />
          <Outlet />
        </Stack>
      </Flex>
    </>
  );
}
