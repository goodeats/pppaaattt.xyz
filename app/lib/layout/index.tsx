import { CustomSidebar, Flex } from '~/components';
import { type ReactNode } from 'react';

import PageWrapper from './PageWrapper';
import Meta from './Meta';
import PageContainer from './PageContainer';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

export type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const items = [{ id: '/dashboard/builder', title: 'Builder' }];

  return (
    <PageWrapper>
      <Meta />
      <PageContainer>
        <Header />
        <Flex flex={1}>
          <CustomSidebar items={items} itemType="Main" />
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
