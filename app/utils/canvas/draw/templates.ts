import {
  BuildDimensions,
  BuildPalette,
} from '~/lib/utils/build-structure/build-attributes';
import { PixelCoordColorHex } from '~/utils/pixel-utils';
import { CanvasDrawBackground } from './background';
import { ContextBegin, ContextEnd } from './context';
import { CanvasDrawTriangleAtCoords } from './triangle';
import { randomInRange, randomIndex } from '~/utils/random-utils';
import { adjustColorBrightness, areColorsSimilar } from '~/utils/color-utils';
import { RotateCompass } from '~/utils/rotate-utils';
import { TemplateLayoutGrid } from '../build/template-layout-grid';
import { TemplateLayoutRandom } from '../build/template-layout-random';

const COUNT = 10000;

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

  templateBuilds.push(
    ...TemplateLayoutRandom({
      ctx,
      count: COUNT,
      dimensions,
      pixelToColor: true,
    })
  );

  const ROWS = 13;
  const COLS = 19;
  const defaultLayerProps = {
    rows: ROWS,
    cols: COLS,
    dimensions,
  };

  templateBuilds.push(
    ...TemplateLayoutGrid({
      ...defaultLayerProps,
      pixelColor: '#FFAD5A',
    })
  );
  templateBuilds.push(
    ...TemplateLayoutGrid({
      ...defaultLayerProps,
      pixelColor: '#4F9DA6',
    })
  );
  templateBuilds.push(
    ...TemplateLayoutGrid({
      ...defaultLayerProps,
      pixelColor: '#1A0841',
    })
  );

  const rotateOptions = RotateCompass();
  for (let i = 0; i < COUNT; i++) {
    // the color will be black if the pixel is outside the canvas
    const x = randomInRange(1, width - 1);
    const y = randomInRange(1, height - 1);
    // faking image pixel color
    // const pixelColor = '#1A0841';
    const pixelColor = PixelCoordColorHex({ ctx, x, y });
    const backgroundColor = '#2096f3';
    // const isBackground =
    //   pixelColor === backgroundColor ||
    //   areColorsSimilar(pixelColor, backgroundColor, 0.3) ||
    //   areColorsSimilar(pixelColor, '#114f7f', 0.13);

    // const isBackground = false;
    const isBackground =
      pixelColor === '#FFFFFF' ||
      adjustColorBrightness(pixelColor, 0.5) === '#FFFFFF';

    let backupPixelColor;
    if (isBackground) {
      const backupColors = [
        '#aa0000',
        '#075600',
        '#213c18',
        '#668c6f',
        '#378b29',
        // '#f1e2d0',
        // '#d8cbbb',
        // '#f6ede2',
      ];
      // backupPixelColor = backupColors[randomIndex(backupColors)];
      // backupPixelColor = '#FFFFFF';
      backupPixelColor = '#000000'; // ghost white
    }
    // const size = 30;
    const sizeMultiplier = 1;
    const sizePercent = 0.1;
    const canvasWidth = width;
    const size = canvasWidth * sizePercent * sizeMultiplier;
    // const size = isBackground ? 100 : size;
    const index = randomIndex(rotateOptions);
    const rotate = rotateOptions[index];

    const templateBuild = {
      x,
      y,
      pixelColor: backupPixelColor || pixelColor,
      size,
      rotate,
      isBackground,
    };

    // templateBuilds.push(templateBuild);
  }

  // redraw background to hide image
  CanvasDrawBackground({ ctx, palette, dimensions });

  templateBuilds.forEach(
    ({ x, y, pixelColor, size, rotate, isBackground }, i) => {
      ContextBegin({ ctx });

      // // Adjust size randomly within a range of a customizable percentage bigger or smaller
      // const percentage = 1.5; // customize this value as needed
      // const adjustment = Math.random() * 2 * percentage - percentage; // random number between -percentage and percentage
      // // size = size * (1 + adjustment);
      // size = isBackground ? 1 : size * (1 + adjustment);

      // rotate = i % 2 === 0 ? rotate : 1;
      // rotate = i % 2 === 0 ? 1.5 : 0.5;

      CanvasDrawTriangleAtCoords({
        ctx,
        triangle: { position: { x, y }, size, rotate },
      });

      // const fillPixelColorAdjusted = adjustColorBrightness(pixelColor, -0.31);

      ctx.fillStyle = pixelColor;
      // ctx.fillStyle = fillPixelColorAdjusted;
      if (isBackground) {
        // const xmasColors = ['#f00', '#0f0'];
        // const xmasColor = xmasColors[randomIndex(xmasColors)];
        // ctx.fillStyle = xmascolor;
        // ctx.fill();
      } else if (i % 9 === 0) {
        ctx.fill();
      }
      // ctx.fill();

      // ctx.lineWidth = 2;
      ctx.lineWidth = isBackground ? 6 : 3;

      // const strokePixelColorAdjusted = adjustColorBrightness(
      //   pixelColor,
      //   -0.231
      // );

      ctx.strokeStyle = pixelColor;
      // ctx.strokeStyle = strokePixelColorAdjusted;
      ctx.stroke();

      ContextEnd({ ctx });
    }
  );
};
