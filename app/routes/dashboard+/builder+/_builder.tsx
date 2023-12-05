import { Flex, Stack, StackDivider } from '~/components';
import { NavLink, Outlet } from '@remix-run/react';

export const handle = {
  breadcrumb: () => <NavLink to={'/dashboard/builder'}>Builder</NavLink>,
};

export default function BuilderPage() {
  return (
    <>
      <Flex flex={1} flexDirection="column">
        <Stack divider={<StackDivider borderColor="gray.300" />}>
          <Outlet />
        </Stack>
      </Flex>
    </>
  );
}
