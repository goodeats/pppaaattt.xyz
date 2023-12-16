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
import { CanvasHeight, CanvasWidth } from '~/utils/canvas-utils';
import { IDesignAttribute, IInputParameter } from '~/utils/db.server';

type DesignAttributeWithInputParameters = Pick<
  IDesignAttribute,
  'id' | 'title' | 'attributeType'
> & {
  inputParameters: Pick<
    IInputParameter,
    | 'id'
    | 'inputType'
    | 'unitType'
    | 'explicitValues'
    | 'randomValues'
    | 'rangeValues'
  >[];
};

type CanvasCardProps = {
  designAttributes: DesignAttributeWithInputParameters[];
};

export const CanvasCard = ({ designAttributes }: CanvasCardProps) => {
  const Description = () => {
    return (
      <Box>
        <Text fontSize="xs">Results of Layer design</Text>
      </Box>
    );
  };

  const Canvas = () => {
    const width = CanvasWidth({ designAttributes });
    const height = CanvasHeight({ designAttributes });

    return (
      <Box textAlign="center">
        <canvas
          id="canvas"
          width={width}
          height={height}
          style={{ background: 'gold' }}
        ></canvas>
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
          <Canvas />
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
