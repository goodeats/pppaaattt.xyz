import { ChakraProvider, CustomBreadcrumb } from '~/components';
import Layout from '~/lib/layout';
import Column from '~/lib/layout/Column.tsx';
import { theme } from '~/lib/styles/theme';
import { Outlet, useMatches } from '@remix-run/react';

export default function DashboardPath() {
  const matches = useMatches();
  const breadcrumbs = matches
    .filter((match) => match.handle && match.handle.breadcrumb)
    .map((match) => match.handle.breadcrumb(match));

  return (
    <ChakraProvider resetCSS theme={theme}>
      <Layout>
        <Column>
          <CustomBreadcrumb breadcrumbs={breadcrumbs} />
          <Outlet />
        </Column>
      </Layout>
    </ChakraProvider>
  );
}
