import { Text, Flex } from '~/components';
import { NavLink, Outlet } from '@remix-run/react';

export const handle = {
  breadcrumb: (match) => {
    const { params } = match;
    const layerId = params.layerId;
    return (
      <NavLink to={`/dashboard/builder/layers/${layerId}/design-attributes`}>
        Design Attributes
      </NavLink>
    );
  },
};

export default function LayersPage() {
  return (
    <Flex flexDirection="column" width="full" minHeight="30vh">
      <Text fontSize="medium">Design Attributes</Text>
      <Outlet />
    </Flex>
  );
}
