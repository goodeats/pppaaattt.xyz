import { Outlet } from '@remix-run/react';
import { Flex } from '~/components';

export const PageContent = () => {
  return (
    <Flex flex="1" width="full" paddingY={22} borderRadius={6}>
      <Flex flex="1" width="full">
        <Outlet />
      </Flex>
    </Flex>
  );
};
