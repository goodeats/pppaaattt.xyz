import {
  Box,
  Button,
  ButtonGroup,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import LayerCard from '../cards/LayerCard';

type LayerChildStackProps = {
  currentDepth: number;
  childCount: number;
  addChild: () => void;
  removeChild?: () => void;
};

export const LayerChildStack = ({
  currentDepth,
  childCount,
  addChild,
  removeChild,
}: LayerChildStackProps) => {
  const NoChildren = () => {
    return (
      <Box>
        <Text>No children</Text>
      </Box>
    );
  };

  const StackBody = () => {
    if (childCount === 0) {
      return <NoChildren />;
    }

    return (
      <Box>
        <Text>{childCount} Children</Text>
        {[...Array(childCount)].map((_, n) => (
          <Box key={n} mt={4}>
            <LayerCard depth={currentDepth + 1} />
          </Box>
        ))}
      </Box>
    );
  };

  const StackFooter = () => {
    return (
      <Box>
        <ButtonGroup spacing="2">
          <Button colorScheme="blue" onClick={addChild}>
            Create Layer
          </Button>
          {childCount > 0 && (
            <Button colorScheme="red" ml={2} onClick={removeChild}>
              Delete Layer
            </Button>
          )}
        </ButtonGroup>
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
