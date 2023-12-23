import {
  BuildDimensions,
  BuildPalette,
} from '~/lib/utils/build-structure/build-attributes';
import { PixelCoordColorHex } from '~/utils/pixel-utils';
import { CanvasDrawBackground } from './background';
import { ContextBegin, ContextEnd } from './context';
import { CanvasDrawTriangleAtCoords } from './triangle';
import { randomInRange, randomIndex } from '~/utils/random-utils';
import { adjustColorBrightness } from '~/utils/color-utils';

const COUNT = 100000;

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
  // const rotateOptions = [45];
  for (let i = 0; i < COUNT; i++) {
    // the color will be black if the pixel is outside the canvas
    const x = randomInRange(1, width - 1);
    const y = randomInRange(1, height - 1);
    const pixelColor = PixelCoordColorHex({ ctx, x, y });
    const isBackground =
      pixelColor === '#FFFFFF' ||
      adjustColorBrightness(pixelColor, 0.5) === '#FFFFFF';

    let backupPixelColor;
    if (isBackground) {
      // const backupColors = [
      //   '#f1e2d0',
      //   '#d8cbbb',
      //   '#f6ede2',
      //   // '#c0b4a6',
      //   // '#a89e91',
      //   // '#90877c',
      // ];
      // backupPixelColor = backupColors[randomIndex(backupColors)];
      backupPixelColor = '#f1e2d0';
    }
    // const size = 30;
    const size = isBackground ? 30 : 30;
    const index = randomIndex(rotateOptions);
    // const rotation = rotateOptions[index];
    const rotation = isBackground ? rotateOptions[index] : 315;
    // const rotation = isBackground ? 225 : 45;
    const rotate = (rotation / 360) * 2;

    const templateBuild = {
      x,
      y,
      pixelColor: backupPixelColor || pixelColor,
      size,
      rotate,
      isBackground,
    };

    templateBuilds.push(templateBuild);
  }

  // redraw background to hide image
  CanvasDrawBackground({ ctx, palette, dimensions });

  templateBuilds.forEach(
    ({ x, y, pixelColor, size, rotate, isBackground }, i) => {
      ContextBegin({ ctx });
      CanvasDrawTriangleAtCoords({
        ctx,
        triangle: { position: { x, y }, size, rotate },
      });

      ctx.fillStyle = pixelColor;
      if (isBackground) {
        ctx.fill();
      } else if (i % 3 === 0) {
        ctx.fill();
      }
      // ctx.lineWidth = 2;
      ctx.lineWidth = isBackground ? 2 : 1;

      const pixelColorAdjusted = adjustColorBrightness(pixelColor, -0.1);

      ctx.strokeStyle = pixelColorAdjusted;
      ctx.stroke();

      ContextEnd({ ctx });
    }
  );
};
