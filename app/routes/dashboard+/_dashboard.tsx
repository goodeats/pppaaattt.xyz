import { Breadcrumb, BreadcrumbItem, ChakraProvider } from '~/components';
import Layout from '~/lib/layout';
import Column from '~/lib/layout/Column.tsx';
import { theme } from '~/lib/styles/theme';
import { Outlet, useMatches } from '@remix-run/react';

export default function DashboardPath() {
  const matches = useMatches();

  const BreadCrumbs = () => {
    return (
      <Breadcrumb>
        {matches
          .filter((match) => match.handle && match.handle.breadcrumb)
          .map((match, index) => (
            <BreadcrumbItem key={index}>
              {match.handle.breadcrumb(match)}
            </BreadcrumbItem>
          ))}
      </Breadcrumb>
    );
  };

  return (
    <ChakraProvider resetCSS theme={theme}>
      <Layout>
        <Column>
          <BreadCrumbs />
          <Outlet />
        </Column>
      </Layout>
    </ChakraProvider>
  );
}
