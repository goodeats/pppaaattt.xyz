import { Flex } from '@chakra-ui/react';
import { LayoutProps } from '.';

const Column = ({ children }: LayoutProps) => {
  return (
    <Flex flex="1" flexDirection="column" paddingY={8} paddingX={5}>
      {children}
    </Flex>
  );
};

export default Column;
