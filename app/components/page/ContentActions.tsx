import { NavLink } from '@remix-run/react';
import { Button, ButtonGroup, Stack } from '~/components';

type ContentActionsProps = {
  children?: React.ReactNode;
};

export const ContentActions = ({ children }: ContentActionsProps) => {
  return (
    <Stack>
      <ButtonGroup>
        <NavLink to="edit">
          <Button variant="outline">Edit</Button>
        </NavLink>
        {children}
      </ButtonGroup>
    </Stack>
  );
};
