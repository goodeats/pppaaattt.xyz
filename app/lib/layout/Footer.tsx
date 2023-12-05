import { Box, Link, Text } from '~/components';

const Footer = () => {
  return (
    <Box as="footer" width="full" textAlign="right" paddingX={8} paddingY={2}>
      <Link href="https://github.com/goodeats" isExternal>
        <Text fontSize="sm">by goodeats</Text>
      </Link>
    </Box>
  );
};

export default Footer;
