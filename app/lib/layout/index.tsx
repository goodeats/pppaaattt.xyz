import { Flex } from '@chakra-ui/react';
import { type ReactNode } from 'react';

import PageWrapper from './PageWrapper';
import Meta from './Meta';
import PageContainer from './PageContainer';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Sidebar from './Sidebar';

export type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <PageWrapper>
      <Meta />
      <PageContainer>
        <Header />
        <Flex flex={1}>
          <Sidebar />
          <Main>
            <Flex flex="1" width="full">
              {children}
            </Flex>
          </Main>
        </Flex>

        <Footer />
      </PageContainer>
    </PageWrapper>
  );
};

export default Layout;
