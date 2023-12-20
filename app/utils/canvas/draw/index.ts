import { DesignAttributeWithInputParameters } from '~/utils/canvas-utils';
import { CanvasDrawDimensions } from './dimensions';
import { CanvasDrawBackground } from './background';
import { BuildAttributes } from '~/lib/utils/build-structure/build-attributes';

type CanvasDrawProps = {
  canvas: HTMLCanvasElement;
  buildAttributes: BuildAttributes;
  designAttributes: DesignAttributeWithInputParameters[];
};

export const CanvasDraw = ({
  canvas,
  buildAttributes,
  designAttributes,
}: CanvasDrawProps): void => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const { dimensions } = buildAttributes;
  if (!dimensions) throw new Error('Dimensions not found');
  CanvasDrawDimensions({ canvas, dimensions });

  const { palette } = buildAttributes;
  if (!palette) throw new Error('Palette not found');
  CanvasDrawBackground({ ctx, palette, dimensions });
};
