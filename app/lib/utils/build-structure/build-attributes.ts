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
export type LayoutStyle =
  | 'centered'
  | 'stretched'
  | 'stretch-height'
  | 'stretch-width';

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

export type BuildImage = {
  url: string;
  layout: LayoutStyle;
  display: boolean;
};

export type BuildSize = {
  size: number;
  format: DistanceFormat;
};

export type BuildAttributes = {
  dimensions?: BuildDimensions;
  palette?: BuildPalette;
  background?: BuildBackground;
  image?: BuildImage;
  size?: BuildSize;
};
