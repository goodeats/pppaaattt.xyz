import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../lib/styles/theme/index.ts';
import Layout from '~/lib/layout';
import { DataFunctionArgs, json } from '@remix-run/node';
import Column from '~/lib/layout/Column.tsx';
import { ColumnHeading } from '~/lib/layout/columns/_shared.tsx';

export async function loader({ request }: DataFunctionArgs) {
  const url = new URL(request.url);
  console.log(url);
  return json({ home: true });
}

export default function Index() {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Layout>
        <Column>
          <ColumnHeading>Home</ColumnHeading>
        </Column>
      </Layout>
    </ChakraProvider>
  );
}
