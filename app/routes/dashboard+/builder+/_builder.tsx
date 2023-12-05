import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Stack,
  StackDivider,
  useColorModeValue,
} from '~/components';
import { ColumnHeading } from '~/lib/layout/columns/_shared.tsx';
import { NavLink, Outlet } from '@remix-run/react';

export default function BuilderPage() {
  const navs = [
    { id: '', title: 'Overview' },
    { id: 'layers', title: 'Layers' },
    { id: 'design-attributes', title: 'Design Attributes' },
  ];

  const NavGroup = () => {
    const bgActive = useColorModeValue('gray.100', 'gray.800');
    const bgHover = useColorModeValue('gray.300', 'gray.600');

    return (
      <Box as="nav" aria-label="Builder navigation" marginBottom={3}>
        <ButtonGroup variant="outline">
          {navs.map((nav, i) => (
            <NavLink key={i} to={nav.id}>
              {({ isActive, isPending }) => (
                <Button
                  bg={isActive ? bgActive : undefined}
                  _hover={{ bg: bgHover }}
                  transition="background-color 0.2s ease-in-out"
                  disabled={isPending}
                >
                  {nav.title}
                </Button>
              )}
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
