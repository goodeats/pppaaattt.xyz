import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../lib/styles/theme/index.ts';
import Layout from '~/lib/layout';

export default function Index() {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Layout>
        <p>by goodeats</p>
      </Layout>
    </ChakraProvider>
  );
}
