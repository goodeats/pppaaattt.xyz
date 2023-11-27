import { Box, Button, HStack } from '@chakra-ui/react';
import Column from '../Column';
import { ColumnHeading } from './_shared';

const CanvasColumn = () => {
  function addLeadingZeroes(n: number): string {
    return n < 10 ? `0${n}` : `${n}`;
  }

  const downloadCanvasAsPNG = () => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const link = document.createElement('a');

    const currentDate = new Date();
    const dateString = `${currentDate
      .toISOString()
      .slice(0, 10)}_${addLeadingZeroes(
      currentDate.getHours()
    )}-${addLeadingZeroes(currentDate.getMinutes())}-${addLeadingZeroes(
      currentDate.getSeconds()
    )}`;

    link.download = `${dateString}.pppaaattt.xyz.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const canvasPrefill = () => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Draw full background before triangle
      ctx.fillStyle = '#f5f5f5';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw an X
      // Line from top left to bottom right
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(canvas.width, canvas.height);
      ctx.stroke();

      // Line from bottom left to top right
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      ctx.lineTo(canvas.width, 0);
      ctx.stroke();
    }
  };

  return (
    <Column>
      <ColumnHeading>Output</ColumnHeading>
      <Box as="canvas" id="canvas" ref={canvasPrefill} borderRadius={0}></Box>
      <HStack marginY={10}>
        <Button colorScheme="blue" size="sm" onClick={downloadCanvasAsPNG}>
          Download
        </Button>
      </HStack>
    </Column>
  );
};

export default CanvasColumn;
