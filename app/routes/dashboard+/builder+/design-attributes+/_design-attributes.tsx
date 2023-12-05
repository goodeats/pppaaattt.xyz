import {
  Box,
  Flex,
  useColorModeValue,
  Button,
  Stack,
  ButtonGroup,
  StackDivider,
} from '~/components';
import { NavLink, Outlet } from '@remix-run/react';

export default function DesignAttributesPage() {
  const navs = [
    { id: '', title: 'Overview' },
    { id: 'container', title: 'Container' },
  ];

  const NavGroup = () => {
    const bgHover = useColorModeValue('gray.300', 'gray.600');

    return (
      <Box as="nav" aria-label="Builder navigation" marginBottom={3}>
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
      <Flex flex={1} flexDirection="column">
        <Stack divider={<StackDivider borderColor="gray.300" />}>
          <NavGroup />
          <Outlet />
        </Stack>
      </Flex>
    </>
  );
}
