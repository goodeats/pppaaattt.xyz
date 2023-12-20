import {
  BuildDimensions,
  BuildPalette,
} from '~/lib/utils/build-structure/build-attributes';
import { PixelCoordColorHex } from '~/utils/pixel-utils';
import { CanvasDrawBackground } from './background';

const COUNT = 10000;

type CanvasDrawProps = {
  ctx: CanvasRenderingContext2D;
  palette: BuildPalette;
  dimensions: BuildDimensions;
};

const randomInRange = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const CanvasDrawTemplates = async ({
  ctx,
  palette,
  dimensions,
}: CanvasDrawProps) => {
  const { width, height } = dimensions;

  const templateBuilds = [];
  for (let i = 0; i < COUNT; i++) {
    // the color will be black if the pixel is outside the canvas
    const x = randomInRange(1, width - 1);
    const y = randomInRange(1, height - 1);
    const pixelColor = PixelCoordColorHex({ ctx, x, y });

    const templateBuild = {
      x,
      y,
      pixelColor,
    };

    templateBuilds.push(templateBuild);
  }

  // redraw background to hide image
  CanvasDrawBackground({ ctx, palette, dimensions });

  console.log(templateBuilds);

  templateBuilds.forEach(({ x, y, pixelColor }) => {
    ctx.fillStyle = pixelColor;
    ctx.fillRect(x - 5, y - 5, 10, 10);
  });
};
