import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

const LayerCard = () => {
  const bg = useColorModeValue('gray.700', 'gray.300');
  const bgHeader = useColorModeValue('gray.800', 'gray.200');
  const textColor = useColorModeValue('white', 'gray.800');

  return (
    <Card bg={bg} textColor={textColor}>
      <CardHeader bg={bgHeader}>
        <Heading size="md">Layer</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Design Attributes
            </Heading>
            <Text pt="2" fontSize="sm">
              Set attributes for this layer
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Child Layers
            </Heading>
            <Text pt="2" fontSize="sm">
              Layers that inherit from this layer
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Actions
            </Heading>
            <Text pt="2" fontSize="sm">
              Delete, duplicate, or rename this layer
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default LayerCard;
