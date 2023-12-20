type PaletteExplicitValuesType = string[];
type PaletteRandomValuesType = number;
type PaletteRangeValuesType = string[];

enum InputTypeEnum {
  explicit = 'explicit',
  random = 'random',
  // range = 'range',
}

enum UnitTypeEnum {
  hexcode = 'hexcode',
  // do these too when ready
  // https://chat.openai.com/c/5fa01e0a-5ae7-4be4-989d-5f2867bcf8df
  // rgba = 'rgba',
  // hsl = 'hsl',
  // hsla = 'hsla',
  // cmky = 'cmky',
  // pantone = 'pantone',
  // cielab = 'cielab',
}

export type InputParameterPaletteExplicitValuesType = {
  hexcode: PaletteExplicitValuesType;
};

export type InputParameterPaletteRandomValuesType = {
  hexcode: number;
};

// how to range??
export type InputParameterPaletteRangeValuesType = {
  hexcode: PaletteRangeValuesType;
};

export type InputParameterPaletteType = {
  inputType: InputTypeEnum;
  unitType: UnitTypeEnum;
  explicitValues: InputParameterPaletteExplicitValuesType;
  randomValues: InputParameterPaletteRandomValuesType;
  rangeValues: InputParameterPaletteRangeValuesType;
};

export const defaultPaletteColors = [
  '#835a3d',
  '#FF5959',
  '#FFAD5A',
  '#4F9DA6',
  '#1A0841',
];

export const InputParameterPaletteDefault: InputParameterPaletteType = {
  inputType: InputTypeEnum.explicit,
  unitType: UnitTypeEnum.hexcode,
  explicitValues: {
    hexcode: defaultPaletteColors,
  },
  randomValues: {
    hexcode: 4,
  },
  rangeValues: {
    hexcode: defaultPaletteColors,
  },
};

export const InputParameterPaletteColors = ({
  colors,
}: {
  colors: string[];
}): InputParameterPaletteType => {
  const defaultPalette = InputParameterPaletteDefault;
  const { explicitValues, rangeValues, ...newPalette } = defaultPalette;

  // set the colors on explicitValues and rangeValues
  explicitValues.hexcode = colors;
  rangeValues.hexcode = colors;

  const colorsPalette = {
    ...newPalette,
    explicitValues,
    rangeValues,
  };

  return colorsPalette;
};
