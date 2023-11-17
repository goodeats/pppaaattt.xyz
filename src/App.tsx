import { Box, ChakraProvider } from '@chakra-ui/react';
import { theme } from './lib/styles/theme';
import Layout from './lib/layout';

function App() {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Layout>
        <Box color="red">Hello pat</Box>
      </Layout>
    </ChakraProvider>
  );
}

export default App;
