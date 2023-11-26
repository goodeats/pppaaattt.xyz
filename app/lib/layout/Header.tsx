import { Box, Flex } from '@chakra-ui/react';

import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <Flex
      as="header"
      width="full"
      align="center"
      alignSelf="flex-start"
      justifyContent="center"
      gridGap={2}
    >
      <Box>
        <Logo />
      </Box>
      <Box marginLeft="auto">
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;
