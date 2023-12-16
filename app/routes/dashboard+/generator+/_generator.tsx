import { Flex, Stack, StackDivider } from '~/components';
import { Link, Outlet } from '@remix-run/react';

export const handle = {
  breadcrumb: () => (
    // switched to Link from NavLink
    // NavLink was not reloading loader at builder
    <Link to={'/dashboard/generator'} reloadDocument>
      Generator
    </Link>
  ),
};

export default function GeneratorPage() {
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
