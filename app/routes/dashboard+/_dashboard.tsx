import { ChakraProvider } from '~/components';
import Layout from '~/lib/layout';
import Column from '~/lib/layout/Column.tsx';
import { theme } from '~/lib/styles/theme';
import { Outlet } from '@remix-run/react';

export default function DashboardPath() {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Layout>
        <Column>
          <Outlet />
        </Column>
      </Layout>
    </ChakraProvider>
  );
}
