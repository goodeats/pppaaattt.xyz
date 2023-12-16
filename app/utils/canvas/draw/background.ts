import {
  CanvasBackground,
  DesignAttributeWithInputParameters,
} from '~/utils/canvas-utils';

type CanvasDrawProps = {
  ctx: CanvasRenderingContext2D;
  designAttributes: DesignAttributeWithInputParameters[];
  dimensions: { width: number; height: number };
};

export const CanvasDrawBackground = ({
  ctx,
  designAttributes,
  dimensions: { width, height },
}: CanvasDrawProps): { background: string } => {
  const background = CanvasBackground({ designAttributes });

  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);

  return { background };
};
