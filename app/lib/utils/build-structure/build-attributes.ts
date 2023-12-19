export type Dimension = number;
export type DistanceFormat = 'px' | 'percent';

export type Color = 'string';
export type ColorFormat = 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla';
export type ColorStyle =
  | 'none' // transparent
  | 'random' // ignores palette
  | 'palette' // in order of array
  | 'palette-shuffle' // any from palette
  | 'palette-random' // random from palette
  | 'position-pixel'; // color at position pixel

export type Dimensions = {
  width: Dimension;
  height: Dimension;
  distanceStyle: DistanceFormat;
};

export type Palette = {
  colors: Color[];
  format: ColorFormat;
};

export type Background = {
  colorStyle: ColorStyle;
};

export type BuildAttributesType = {
  dimensions: Dimensions;
  palette: Palette;
  background: Background;
};
