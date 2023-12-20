import { BuildDimensions } from '~/lib/utils/build-structure/build-attributes';

type CanvasDrawProps = {
  canvas: HTMLCanvasElement;
  dimensions: BuildDimensions;
};

export const CanvasDrawDimensions = ({
  canvas,
  dimensions,
}: CanvasDrawProps): { width: number; height: number } => {
  const { width, height } = dimensions;

  canvas.width = width;
  canvas.height = height;

  return { width, height };
};
