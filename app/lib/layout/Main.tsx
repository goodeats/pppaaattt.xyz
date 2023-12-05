import { Flex, useColorModeValue } from '~/components';
import { LayoutProps } from '.';

const Main = ({ children }: LayoutProps) => {
  const bg = useColorModeValue('gray.100', 'gray.700');

  return (
    <Flex
      flex="1"
      width="full"
      as="main"
      paddingY={22}
      bg={bg}
      borderRadius={6}
    >
      {children}
    </Flex>
  );
};

export default Main;
