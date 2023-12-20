import { BuildDimensions } from '~/lib/utils/build-structure/build-attributes';

type CanvasDrawProps = {
  canvas: HTMLCanvasElement;
  dimensions: BuildDimensions;
};

export const CanvasDrawDimensions = ({
  canvas,
  dimensions,
}: CanvasDrawProps) => {
  const { width, height } = dimensions;

  canvas.width = width;
  canvas.height = height;
};
