import { NavLink } from '@remix-run/react';
import {
  Box,
  Button,
  ButtonGroup,
  Column,
  ColumnContainer,
  Stack,
  Text,
} from '~/components';
import { colorHexInvert } from '~/utils/color-utils';

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

type InputParametersBodyProps = {
  values: string[];
  attributeType?: string;
};

export const InputParametersBody = ({
  values,
  attributeType,
}: InputParametersBodyProps) => {
  // palette is unique
  if (attributeType === 'palette') {
    return <PaletteStack values={values} />;
  }

  // most should be just text
  return (
    <>
      {values.map((value, i) => (
        <Text key={i} fontSize="small">
          {value}
        </Text>
      ))}
    </>
  );
};

type InputParametersActionsProps = {
  linkTo: string;
  linkText: string;
};

// this should be at the bottom
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

export const PaletteStack = ({ values }: { values: string[] }) => {
  return (
    <ColumnContainer>
      {values.map((value, i) => {
        return (
          <Column key={i}>
            <Box p={8} bg={value} textAlign="center">
              <Text color={colorHexInvert(value)} fontWeight="bold">
                {value}
              </Text>
            </Box>
          </Column>
        );
      })}
    </ColumnContainer>
  );
};
