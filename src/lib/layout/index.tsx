import { Box, Flex } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import Header from './Header';
import Meta from './Meta';
import Main from './Main';
import Footer from './Footer';
import CanvasColumn from './columns/CanvasColumn';
import FormColumn from './columns/FormColumn';

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
            <FormColumn />
            <CanvasColumn />
          </Flex>
        </Main>
        <Footer>{children}</Footer>
      </Flex>
    </Box>
  );
};

export default Layout;
