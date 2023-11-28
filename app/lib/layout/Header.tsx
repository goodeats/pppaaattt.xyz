import { Box, Flex } from '@chakra-ui/react';

import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { Link } from '@remix-run/react';

const Header = () => {
  return (
    <Flex
      as="header"
      width="full"
      align="center"
      alignSelf="flex-start"
      justifyContent="center"
      gridGap={2}
      paddingX={8}
      paddingY={5}
    >
      <Box>
        <Link to="/">
          <Logo />
        </Link>
      </Box>
      <Box marginLeft="auto">
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;
