import { Box, Flex } from '@chakra-ui/react';
import { type ReactNode } from 'react';

import Meta from './Meta';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

export type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box margin="0 auto" maxWidth={1200} transition="0.5s ease-out">
      <Meta />
      <Flex direction="column" margin="8" minHeight="90vh">
        <Header />
        <Main>
          <Flex flex="1" width="full">
            {children}
          </Flex>
        </Main>
        <Footer />
      </Flex>
    </Box>
  );
};

export default Layout;
