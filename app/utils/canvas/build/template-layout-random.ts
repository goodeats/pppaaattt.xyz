import { BuildDimensions } from '~/lib/utils/build-structure/build-attributes';
import { RotateCompass } from '../../rotate-utils';
import { randomInRange, randomIndex } from '../../random-utils';
import { colorRandomHex } from '../../color-utils';
import { PixelCoordColorHex } from '~/utils/pixel-utils';
import { colorIsMatching } from '~/utils/color-match-utils';

// templateBuilds.push(
//   ...TemplateLayoutRandom({
//     ctx,
//     count: COUNT,
//     dimensions,
//     pixelToColor: true,
//     backgroundOptions: {
//       pixelColorMatch: '#FFFFFF',
//       matchSimilarity: 0.3,
//       matchBrightness: 0.3,
//       skip: true,
//       paletteBackup: ['#FF0000', '#00F000', '#0000F0'],
//     },
//   })
// );

// use this when you want to adjust the background of an image
type BackgroundOptions = {
  pixelColorMatch: string;
  matchSimilarity?: number;
  matchBrightness?: number;
  skip?: boolean;
  paletteBackup?: string[];
};

type TemplateLayoutRandomProps = {
  ctx: CanvasRenderingContext2D;
  count: number;
  dimensions: BuildDimensions;
  pixelToColor?: boolean;
  backgroundOptions?: BackgroundOptions;
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
  backgroundOptions,
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
    let pixelColorBackup;
    let isBackground = false;

    // if background options are provided, check if the pixel color matches
    // if it does, skip or set the pixel color to the backup color
    // if no backup color is provided, set the pixel color to a random color
    if (backgroundOptions && pixelColor) {
      const {
        pixelColorMatch,
        matchSimilarity,
        matchBrightness,
        skip,
        paletteBackup,
      } = backgroundOptions;

      const isMatch = colorIsMatching({
        pixelColor,
        pixelColorMatch,
        matchSimilarity,
        matchBrightness,
      });

      if (isMatch) {
        if (skip) continue;
        isBackground = true;

        if (paletteBackup) {
          const index =
            paletteBackup.length > 1 ? randomIndex(paletteBackup) : 0;
          const pixelColor = paletteBackup[index];
          pixelColorBackup = pixelColor;
        } else {
          pixelColorBackup = colorRandomHex();
        }
      }
    }

    const sizeMultiplier = 1;
    const sizePercent = 0.05;
    const canvasWidth = width;
    const size = canvasWidth * sizePercent * sizeMultiplier;

    const index = randomIndex(rotateOptions);
    const rotate = rotateOptions[index];

    const templateBuild = {
      x,
      y,
      pixelColor: pixelColorBackup || pixelColor || colorRandomHex(),
      size,
      rotate,
      isBackground,
    };

    templateBuilds.push(templateBuild);
  }

  return templateBuilds;
};
