import { Box, Button, Stack, StackDivider, Text } from '@chakra-ui/react';
import React from 'react';
import LayerCard from '../cards/LayerCard';

export const LayerChildStack = () => {
  const [count, setCount] = React.useState(0);

  const NoChildren = () => {
    return (
      <Box>
        <Text>No children</Text>
      </Box>
    );
  };

  const StackBody = () => {
    if (count === 0) {
      return <NoChildren />;
    }

    return (
      <Box>
        <Text>{count} Children</Text>
        {[...Array(count)].map((_, n) => (
          <Box key={n} mt={4}>
            <LayerCard />
          </Box>
        ))}
      </Box>
    );
  };

  const StackFooter = () => {
    return (
      <Box>
        <Button colorScheme="blue" onClick={() => setCount(count + 1)}>
          Create Layer
        </Button>
      </Box>
    );
  };

  return (
    <Stack
      spacing={2}
      divider={<StackDivider borderColor="gray.300" />}
      textAlign="left"
    >
      <StackBody />
      <StackFooter />
    </Stack>
  );
};
