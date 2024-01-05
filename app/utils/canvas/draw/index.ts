import { CanvasDrawDimensions } from './dimensions';
import { CanvasDrawBackground } from './background';
import {
  BuildAttributes,
  BuildDimensions,
  BuildPalette,
  BuildSize,
} from '~/lib/utils/build-structure/build-attributes';
import { CanvasDrawImage } from './image';
import { CanvasDrawTemplates } from './templates';

export type DrawAttributes = {
  ctx: CanvasRenderingContext2D;
  dimensions: BuildDimensions;
  palette: BuildPalette;
  size: BuildSize;
};

type CanvasDrawProps = {
  canvas: HTMLCanvasElement;
  buildAttributes: BuildAttributes;
};

export const CanvasDraw = async ({
  canvas,
  buildAttributes,
}: CanvasDrawProps) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const { dimensions, palette, image, size } = buildAttributes;
  if (!dimensions) throw new Error('Dimensions not found');
  if (!palette) throw new Error('Palette not found');
  if (!size) throw new Error('Size not found');

  CanvasDrawDimensions({ canvas, dimensions });
  CanvasDrawBackground({ ctx, palette, dimensions });

  if (image) {
    await CanvasDrawImage({ ctx, image, dimensions });
  }

  const drawAttributes: DrawAttributes = {
    ctx,
    dimensions,
    palette,
    size,
  };
  await CanvasDrawTemplates({ drawAttributes });
  console.log('🏁 done');
};
