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
  Button,
} from '~/components';
import { BuildAttributes } from '~/lib/utils/build-structure/build-attributes';
import { CanvasDraw } from '~/utils/canvas/draw';

type CanvasCardProps = {
  buildAttributes: BuildAttributes;
};

export const CanvasCard = ({ buildAttributes }: CanvasCardProps) => {
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
      canvas && CanvasDraw({ canvas, buildAttributes });
    }, []);

    return (
      <Box textAlign="center">
        <canvas id="canvas" ref={canvasRef} width={400} height={400}></canvas>
      </Box>
    );
  };

  const downloadCanvasAsPNG = () => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const link = document.createElement('a');
    const timestamp = new Date().getTime();
    link.download = `canvas_${timestamp}.png`;
    link.href = canvas.toDataURL();
    link.click();
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
          <Button onClick={downloadCanvasAsPNG}>Download PNG</Button>
        </Flex>
      </CardFooter>
    </Card>
  );
};
