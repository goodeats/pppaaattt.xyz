type PaletteExplicitValuesType = string[];
type PaletteRandomValuesType = string[];
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
  // rgba: PaletteExplicitValuesType;
  // hsl: PaletteExplicitValuesType;
  // hsla: PaletteExplicitValuesType;
  // cmky: PaletteExplicitValuesType;
  // pantone: PaletteExplicitValuesType;
  // cielab: PaletteExplicitValuesType;
};

export type InputParameterPaletteRandomValuesType = {
  hexcode: PaletteRandomValuesType;
  // rgba: PaletteRandomValuesType;
  // hsl: PaletteRandomValuesType;
  // hsla: PaletteRandomValuesType;
  // cmky: PaletteRandomValuesType;
  // pantone: PaletteRandomValuesType;
  // cielab: PaletteRandomValuesType;
};

// how to range??
export type InputParameterPaletteRangeValuesType = {
  hexcode: PaletteRangeValuesType;
  // rgba: PaletteRangeValuesType;
  // hsl: PaletteRangeValuesType;
  // hsla: PaletteRangeValuesType;
  // cmky: PaletteRangeValuesType;
  // pantone: PaletteRangeValuesType;
  // cielab: PaletteRangeValuesType;
};

export type InputParameterPaletteDefaultType = {
  inputType: InputTypeEnum;
  unitType: UnitTypeEnum;
  explicitValues: InputParameterPaletteExplicitValuesType;
  randomValues: InputParameterPaletteRandomValuesType;
  rangeValues: InputParameterPaletteRangeValuesType;
};

export const InputParameterPaletteDefault: InputParameterPaletteDefaultType = {
  inputType: InputTypeEnum.explicit,
  unitType: UnitTypeEnum.hexcode,
  explicitValues: {
    hexcode: ['#000000', '#ffffff'],
  },
  randomValues: {
    hexcode: ['#000000', '#ffffff'],
  },
  rangeValues: {
    hexcode: ['#000000', '#ffffff'],
  },
};
