import { CanvasDrawBackground } from './background';
import { ContextBegin, ContextEnd } from './context';
import { CanvasDrawTriangleAtCoords } from './triangle';
import { TemplateLayoutGrid } from '../build/template-layout-grid';
import { TemplateLayoutRandom } from '../build/template-layout-random';
import { DrawAttributes } from '.';

const COUNT = 1000;

type CanvasDrawProps = {
  drawAttributes: DrawAttributes;
};

export const CanvasDrawTemplates = async ({
  drawAttributes,
}: CanvasDrawProps) => {
  const { ctx, palette, dimensions, size } = drawAttributes;

  const templateBuilds = [];

  const ROWS = 13;
  const COLS = 19;
  const defaultLayerProps = {
    rows: ROWS,
    cols: COLS,
    dimensions,
    size,
  };

  // grid
  const paletteColors = palette.colors;
  for (let i = 0; i < paletteColors.length; i++) {
    const pixelColor = paletteColors[i];
    templateBuilds.push(
      ...TemplateLayoutGrid({
        ...defaultLayerProps,
        pixelColor,
      })
    );
  }

  // random
  templateBuilds.push(
    ...TemplateLayoutRandom({
      ctx,
      count: COUNT,
      dimensions,
      size,
      pixelToColor: true,
      backgroundOptions: {
        pixelColorMatch: '#FFFFFF',
        matchSimilarity: 0.3,
        matchBrightness: 0.3,
        skip: true,
        paletteBackup: ['#FF0000', '#00F000', '#0000F0'],
      },
    })
  );

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
        // ctx.fill();
      } else if (i % 9 === 0) {
        ctx.fill();
      }
      // ctx.fill();

      ctx.lineWidth = isBackground ? 6 : 3;
      ctx.strokeStyle = pixelColor;
      ctx.stroke();

      ContextEnd({ ctx });
    }
  );
};
