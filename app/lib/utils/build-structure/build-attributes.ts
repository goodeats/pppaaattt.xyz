export type Dimension = number;
export type DistanceFormat = 'px' | 'percent';

export type ColorFormat = 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla';
export type ColorStyle =
  | 'none' // transparent
  | 'random' // ignores palette
  | 'palette' // in order of array
  | 'palette-shuffle' // any from palette
  | 'palette-random' // random from palette
  | 'position-pixel'; // color at position pixel

export type BuildDimensions = {
  width: Dimension;
  height: Dimension;
  format: DistanceFormat;
};

export type BuildPalette = {
  colors: string[];
  format: ColorFormat;
};

export type BuildBackground = {
  colorStyle: ColorStyle;
};

export type BuildAttributes = {
  dimensions?: BuildDimensions;
  palette?: BuildPalette;
  background?: BuildBackground;
};
