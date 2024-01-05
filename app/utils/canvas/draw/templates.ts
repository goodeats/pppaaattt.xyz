import {
  BuildDimensions,
  BuildPalette,
} from '~/lib/utils/build-structure/build-attributes';
import { CanvasDrawBackground } from './background';
import { ContextBegin, ContextEnd } from './context';
import { CanvasDrawTriangleAtCoords } from './triangle';
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
  const templateBuilds = [];

  const ROWS = 13;
  const COLS = 19;
  const defaultLayerProps = {
    rows: ROWS,
    cols: COLS,
    dimensions,
  };

  templateBuilds.push(
    ...TemplateLayoutRandom({
      ctx,
      count: COUNT,
      dimensions,
      pixelToColor: true,
      // backgroundOptions: {
      //   pixelColorMatch: '#FFFFFF',
      //   matchSimilarity: 0.3,
      //   matchBrightness: 0.3,
      //   skip: true,
      //   paletteBackup: ['#FF0000', '#00F000', '#0000F0'],
      // },
    })
  );

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
