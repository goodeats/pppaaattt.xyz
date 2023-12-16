import {
  CanvasHeight,
  CanvasWidth,
  DesignAttributeWithInputParameters,
} from '~/utils/canvas-utils';

type CanvasDrawProps = {
  canvas: HTMLCanvasElement;
  designAttributes: DesignAttributeWithInputParameters[];
};

export const CanvasDrawDimensions = ({
  canvas,
  designAttributes,
}: CanvasDrawProps): { width: number; height: number } => {
  const width = CanvasWidth({ designAttributes });
  const height = CanvasHeight({ designAttributes });

  canvas.width = width;
  canvas.height = height;

  return { width, height };
};
