import { Box, useColorModeValue } from '@chakra-ui/react';
import { LayoutProps } from '.';

const Main = ({ children }: LayoutProps) => {
  const bg = useColorModeValue('gray.100', 'gray.700');

  return (
    <Box flex="1" width="full" as="main" marginY={22} bg={bg} borderRadius={6}>
      {children}
    </Box>
  );
};

export default Main;
