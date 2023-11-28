import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Stack,
  StackDivider,
} from '@chakra-ui/react';
import { ColumnHeading } from '~/lib/layout/columns/_shared.tsx';
import { NavLink, Outlet } from '@remix-run/react';

export default function BuilderPage() {
  const navs = [
    { id: '', title: 'Overview' },
    { id: 'layers', title: 'Layers' },
  ];

  const NavGroup = () => {
    return (
      <Box as="nav" aria-label="Builder navigation">
        <ButtonGroup variant="outline">
          {navs.map((nav, i) => (
            <NavLink key={i} to={nav.id}>
              <Button>{nav.title}</Button>
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
