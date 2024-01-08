import { Box, Flex } from '~/components';
import { type ReactNode } from 'react';

import PageWrapper from './PageWrapper';
import Meta from './Meta';
import PageContainer from './PageContainer';
import Header from './Header';
import Main from './Main';

export type LayoutProps = {
  children: ReactNode;
};

const AuthLayout = ({ children }: LayoutProps) => {
  return (
    <PageWrapper>
      <Meta />
      <PageContainer>
        <Header />
        <Flex flex={1}>
          <Main>
            <Flex flex="1" width="full" justifyContent="center">
              <Box>{children}</Box>
            </Flex>
          </Main>
        </Flex>
      </PageContainer>
    </PageWrapper>
  );
};

export default AuthLayout;
