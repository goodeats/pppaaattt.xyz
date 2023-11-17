import { Box, Heading, Stack } from '@chakra-ui/react';
import Column from '../Column';
import LayerCard from '../cards/LayerCard';

const FormColumn = () => {
  return (
    <Column>
      <Box width="full" textAlign="center">
        <Heading as="h2" color="brand.700">
          Input
        </Heading>
        <Stack marginY={10} borderRadius={0} padding={1}>
          <LayerCard />
        </Stack>
      </Box>
    </Column>
  );
};

export default FormColumn;
