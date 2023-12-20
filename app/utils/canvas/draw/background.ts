import {
  BuildDimensions,
  BuildPalette,
} from '~/lib/utils/build-structure/build-attributes';

type CanvasDrawProps = {
  ctx: CanvasRenderingContext2D;
  palette: BuildPalette;
  dimensions: BuildDimensions;
};

export const CanvasDrawBackground = ({
  ctx,
  palette,
  dimensions,
}: CanvasDrawProps) => {
  const { width, height } = dimensions;
  const { colors } = palette;
  const color = colors[0];

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
};
