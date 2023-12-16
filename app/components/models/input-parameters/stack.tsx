import { NavLink } from '@remix-run/react';
import { Button, ButtonGroup, Stack, Text } from '~/components';

type DesignAttributesTableProps = {
  children: React.ReactNode | string;
};

export const InputParametersStack = ({
  children,
}: DesignAttributesTableProps) => {
  return <Stack>{children}</Stack>;
};

export const InputParametersTitle = ({ title }: { title: string }) => {
  return <Text fontSize="medium">{title}</Text>;
};

type InputParametersActionsProps = {
  linkTo: string;
  linkText: string;
};

export const InputParametersActions = ({
  linkTo,
  linkText,
}: InputParametersActionsProps) => {
  return (
    <Stack>
      <ButtonGroup>
        <NavLink to={linkTo}>
          <Button variant="outline">{linkText}</Button>
        </NavLink>
      </ButtonGroup>
    </Stack>
  );
};
