import { Box, Flex, Heading } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import Header from './Header';
import Meta from './Meta';
import Main from './Main';
import Column from './Column';
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
            <Column>
              <Box width="full" textAlign="center">
                <Heading as="h2" color="brand.700">
                  Input
                </Heading>
              </Box>
            </Column>
            <Column>
              <Box width="full" textAlign="center">
                <Heading as="h2" color="brand.700">
                  Output
                </Heading>
              </Box>
            </Column>
          </Flex>
        </Main>
        <Footer>{children}</Footer>
      </Flex>
    </Box>
  );
};

export default Layout;
