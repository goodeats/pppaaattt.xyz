import { Flex, Stack, StackDivider } from '~/components';
import { Link, Outlet } from '@remix-run/react';

export const handle = {
  breadcrumb: () => (
    // switched to Link from NavLink
    // NavLink was not reloading loader at builder
    <Link to={'/dashboard/builder'} reloadDocument>
      Builder
    </Link>
  ),
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
