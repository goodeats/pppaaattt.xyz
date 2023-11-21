import { Heading, useColorModeValue } from '@chakra-ui/react';

type ColumnHeadingProps = {
  children?: React.ReactNode;
};

export const ColumnHeading = ({ children }: ColumnHeadingProps) => {
  const color = useColorModeValue('gray.800', 'gray.100');

  return (
    <Heading as="h2" color={color}>
      {children}
    </Heading>
  );
};
