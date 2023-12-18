type SideLengthExplicitValuesType = number;
type SideLengthRandomValuesType = number[];
type SideLengthRangeValuesType = number[];

enum InputTypeEnum {
  explicit = 'explicit',
  random = 'random',
  range = 'range',
}

enum UnitTypeEnum {
  px = 'px',
  percent = 'percent',
}

export type InputParameterSideLengthExplicitValuesType = {
  px: SideLengthExplicitValuesType;
  percent: SideLengthExplicitValuesType;
};

export type InputParameterSideLengthRandomValuesType = {
  px: SideLengthRandomValuesType;
  percent: SideLengthRandomValuesType;
};

export type InputParameterSideLengthRangeValuesType = {
  px: SideLengthRangeValuesType;
  percent: SideLengthRangeValuesType;
};

export type InputParameterSideLengthDefaultType = {
  inputType: InputTypeEnum;
  unitType: UnitTypeEnum;
  explicitValues: InputParameterSideLengthExplicitValuesType;
  randomValues: InputParameterSideLengthRandomValuesType;
  rangeValues: InputParameterSideLengthRangeValuesType;
};

export const InputParameterSideLengthDefault: InputParameterSideLengthDefaultType =
  {
    inputType: InputTypeEnum.explicit,
    unitType: UnitTypeEnum.percent,
    explicitValues: {
      px: 10,
      percent: 10,
    },
    randomValues: {
      px: [10, 20, 30],
      percent: [10, 20, 30],
    },
    rangeValues: {
      px: [10, 50],
      percent: [10, 50],
    },
  };
