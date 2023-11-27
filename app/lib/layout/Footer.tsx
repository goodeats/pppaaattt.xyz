import { Box, Link, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box as="footer" width="full" textAlign="right">
      <Link href="https://github.com/goodeats" isExternal>
        <Text fontSize="sm">by goodeats</Text>
      </Link>
    </Box>
  );
};

export default Footer;
