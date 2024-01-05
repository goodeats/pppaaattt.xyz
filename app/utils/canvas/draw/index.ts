import { CanvasDrawDimensions } from './dimensions';
import { CanvasDrawBackground } from './background';
import { BuildAttributes } from '~/lib/utils/build-structure/build-attributes';
import { CanvasDrawImage } from './image';
import { CanvasDrawTemplates } from './templates';

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

  const { dimensions, image } = buildAttributes;
  if (!dimensions) throw new Error('Dimensions not found');
  CanvasDrawDimensions({ canvas, dimensions });

  const { palette } = buildAttributes;
  if (!palette) throw new Error('Palette not found');
  CanvasDrawBackground({ ctx, palette, dimensions });

  if (image) {
    await CanvasDrawImage({ ctx, image, dimensions });
  }

  await CanvasDrawTemplates({ ctx, palette, dimensions });
  console.log('🏁 done');
};
