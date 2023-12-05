import { NavLink } from '@remix-run/react';
import { Box, Button, Stack } from '~/components';

type PageActionsProps = {
  itemName: string;
};

export const PageActions = ({ itemName }: PageActionsProps) => {
  return (
    <Stack height={100} textAlign="left" paddingX={8} paddingY={5}>
      <Box>
        <NavLink to="new">
          <Button colorScheme="teal">New {itemName}</Button>
        </NavLink>
      </Box>
    </Stack>
  );
};
