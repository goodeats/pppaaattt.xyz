import { ChakraProvider } from '@chakra-ui/react';
import Layout from '~/lib/layout';
import { DataFunctionArgs, json } from '@remix-run/node';
import Column from '~/lib/layout/Column.tsx';
import { ColumnHeading } from '~/lib/layout/columns/_shared.tsx';
import { theme } from '~/lib/styles/theme';

export async function loader({ request }: DataFunctionArgs) {
  const url = new URL(request.url);
  console.log(url);
  return json({ dashboard: true });
}

export default function DashboardPath() {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Layout>
        <Column>
          <ColumnHeading>Dashboard</ColumnHeading>
        </Column>
      </Layout>
    </ChakraProvider>
  );
}
