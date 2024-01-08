import { CustomBreadcrumb } from '~/components';
import Layout from '~/lib/layout';
import Column from '~/lib/layout/Column.tsx';
import { Outlet, useMatches } from '@remix-run/react';

export default function DashboardPath() {
  const matches = useMatches();
  const breadcrumbs = matches
    .filter((match) => match.handle && match.handle.breadcrumb)
    .map((match) => match.handle.breadcrumb(match));

  return (
    <Layout>
      <Column>
        <CustomBreadcrumb breadcrumbs={breadcrumbs} />
        <Outlet />
      </Column>
    </Layout>
  );
}
