import {
  BuildDimensions,
  BuildPalette,
} from '~/lib/utils/build-structure/build-attributes';
import { PixelCoordColorHex } from '~/utils/pixel-utils';
import { CanvasDrawBackground } from './background';
import { ContextBegin, ContextEnd } from './context';
import { CanvasDrawTriangleAtCoords } from './triangle';
import { randomInRange, randomIndex } from '~/utils/random-utils';

const COUNT = 5000;

type CanvasDrawProps = {
  ctx: CanvasRenderingContext2D;
  palette: BuildPalette;
  dimensions: BuildDimensions;
};

export const CanvasDrawTemplates = async ({
  ctx,
  palette,
  dimensions,
}: CanvasDrawProps) => {
  const { width, height } = dimensions;

  const templateBuilds = [];
  const rotateOptions = [0, 45, 90, 135, 180, 225, 270, 315];
  for (let i = 0; i < COUNT; i++) {
    // the color will be black if the pixel is outside the canvas
    const x = randomInRange(1, width - 1);
    const y = randomInRange(1, height - 1);
    const pixelColor = PixelCoordColorHex({ ctx, x, y });
    const size = 50;
    const index = randomIndex(rotateOptions);
    const rotation = rotateOptions[index];
    const rotate = (rotation / 360) * 2;

    const templateBuild = {
      x,
      y,
      pixelColor,
      size,
      rotate,
    };

    templateBuilds.push(templateBuild);
  }

  // redraw background to hide image
  CanvasDrawBackground({ ctx, palette, dimensions });

  templateBuilds.forEach(({ x, y, pixelColor, size, rotate }) => {
    ContextBegin({ ctx });
    CanvasDrawTriangleAtCoords({
      ctx,
      triangle: { position: { x, y }, size, rotate },
    });

    // ctx.fillStyle = pixelColor;
    ctx.lineWidth = 3;
    ctx.strokeStyle = pixelColor;
    ctx.stroke();

    ContextEnd({ ctx });
  });
};
