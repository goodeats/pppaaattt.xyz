import { BuildDimensions } from '~/lib/utils/build-structure/build-attributes';
import { RotateCompass } from '../../rotate-utils';
import { randomInRange, randomIndex } from '../../random-utils';
import { colorRandomHex } from '../../color-utils';
import { PixelCoordColorHex } from '~/utils/pixel-utils';

type TemplateLayoutRandomProps = {
  ctx: CanvasRenderingContext2D;
  count: number;
  dimensions: BuildDimensions;
  pixelToColor?: boolean;
};

type TemplateBuildProps = {
  x: number;
  y: number;
  pixelColor: string;
  size: number;
  rotate: number;
  isBackground: boolean;
};

export const TemplateLayoutRandom = ({
  ctx,
  count,
  dimensions,
  pixelToColor,
}: TemplateLayoutRandomProps): TemplateBuildProps[] => {
  const { width, height } = dimensions;

  const rotateOptions = RotateCompass();
  const templateBuilds: TemplateBuildProps[] = [];

  for (let i = 0; i < count; i++) {
    // Calculate x and y from the random position
    // if the chosen pixel is at the edge of the canvas,
    // the pixel color will be black, so margin by 1 pixel
    const x = randomInRange(1, width - 1);
    const y = randomInRange(1, height - 1);

    const pixelColor = pixelToColor ? PixelCoordColorHex({ ctx, x, y }) : null;

    const sizeMultiplier = 1;
    const sizePercent = 0.1;
    const canvasWidth = width;
    const size = canvasWidth * sizePercent * sizeMultiplier;

    const index = randomIndex(rotateOptions);
    const rotate = rotateOptions[index];

    const templateBuild = {
      x,
      y,
      pixelColor: pixelColor || colorRandomHex(),
      size,
      rotate,
      isBackground: false,
    };

    templateBuilds.push(templateBuild);
  }

  return templateBuilds;
};
