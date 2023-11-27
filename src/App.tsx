import { Text, ChakraProvider } from '@chakra-ui/react';
import { theme } from './lib/styles/theme';
import Layout from './lib/layout';

function App() {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Layout>
        <Text fontSize="xs">by goodeats</Text>
      </Layout>
    </ChakraProvider>
  );
}

export default App;
