import { DesignAttributeWithInputParameters } from '~/utils/canvas-utils';
import { CanvasDrawDimensions } from './dimensions';
import { CanvasDrawBackground } from './background';

type CanvasDrawProps = {
  canvas: HTMLCanvasElement;
  designAttributes: DesignAttributeWithInputParameters[];
};

export const CanvasDraw = ({
  canvas,
  designAttributes,
}: CanvasDrawProps): void => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const { width, height } = CanvasDrawDimensions({ canvas, designAttributes });
  const dimensions = { width, height };

  const { background } = CanvasDrawBackground({
    ctx,
    designAttributes,
    dimensions,
  });
};
