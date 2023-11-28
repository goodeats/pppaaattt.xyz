import { Flex } from '@chakra-ui/react';
import { LayoutProps } from '.';

const PageWrapper = ({ children }: LayoutProps) => {
  return (
    <Flex
      margin="0 auto"
      width="full"
      height="100vh"
      flexDirection="column"
      transition="0.5s ease-out"
    >
      {children}
    </Flex>
  );
};

export default PageWrapper;
