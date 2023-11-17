import { Box, Link } from '@chakra-ui/react';
import { LayoutProps } from '.';

const Footer = ({ children }: LayoutProps) => {
  return (
    <Box as="footer" width="full" textAlign="right">
      <Link href="https://github.com/goodeats" isExternal>
        {children}
      </Link>
    </Box>
  );
};

export default Footer;
