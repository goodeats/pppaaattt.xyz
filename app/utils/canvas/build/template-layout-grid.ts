import { BuildDimensions } from '~/lib/utils/build-structure/build-attributes';
import { RotateCompass } from '../../rotate-utils';
import { randomIndex } from '../../random-utils';
import { colorRandomHex } from '../../color-utils';

// TO ADD GRID
// const ROWS = 33;
// const COLS = 19;
// const defaultLayerProps = {
//   rows: ROWS,
//   cols: COLS,
//   dimensions,
// };

// templateBuilds.push(
//   ...TemplateLayoutGrid({
//     ...defaultLayerProps,
//     pixelColor: '#FFAD5A',
//   })
// );
// templateBuilds.push(
//   ...TemplateLayoutGrid({
//     ...defaultLayerProps,
//     pixelColor: '#4F9DA6',
//   })
// );
// templateBuilds.push(
//   ...TemplateLayoutGrid({
//     ...defaultLayerProps,
//     pixelColor: '#1A0841',
//   })
// );

type TemplateLayoutGridProps = {
  cols: number;
  rows: number;
  dimensions: BuildDimensions;
  pixelColor?: string;
};

type TemplateBuildProps = {
  x: number;
  y: number;
  pixelColor: string;
  size: number;
  rotate: number;
  isBackground: boolean;
};

export const TemplateLayoutGrid = ({
  rows,
  cols,
  dimensions,
  pixelColor,
}: TemplateLayoutGridProps): TemplateBuildProps[] => {
  const { width, height } = dimensions;

  // Calculate the step size for x and y
  const xStep = width / cols;
  const yStep = height / rows;

  const rotateOptions = RotateCompass();
  const templateBuilds: TemplateBuildProps[] = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Calculate x and y for the current position
      const x = col * xStep + xStep / 2; // center in cell
      const y = row * yStep + yStep / 2; // center in cell

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
        rotate: 0.25,
        // rotate,
        isBackground: false,
      };

      templateBuilds.push(templateBuild);
    }
  }

  return templateBuilds;
};
