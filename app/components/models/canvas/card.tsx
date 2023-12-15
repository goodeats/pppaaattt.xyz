import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
} from '~/components';

export const CanvasCard = () => {
  const Description = () => {
    return (
      <Box>
        <Text fontSize="xs">Results of Layer design</Text>
      </Box>
    );
  };

  return (
    <Card variant="outline">
      <CardHeader>
        <Heading size="md">Canvas</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing={4}>
          <Description />
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Flex width="full">
          <Text>Coming: download</Text>
        </Flex>
      </CardFooter>
    </Card>
  );
};
