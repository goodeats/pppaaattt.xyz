import { useEffect, useRef } from 'react';
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
import { CanvasDraw } from '~/utils/canvas/draw';
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
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      canvas && CanvasDraw({ canvas, designAttributes });
    }, []);

    return (
      <Box textAlign="center">
        <canvas id="canvas" ref={canvasRef} width={400} height={400}></canvas>
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
