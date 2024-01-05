type SizeExplicitValuesType = number;
type SizeRandomValuesType = number[];
type SizeRangeValuesType = number[];

enum InputTypeEnum {
  explicit = 'explicit',
  random = 'random',
  range = 'range',
}

enum UnitTypeEnum {
  px = 'px',
  percent = 'percent',
}

export type InputParameterSizeExplicitValuesType = {
  px: SizeExplicitValuesType;
  percent: SizeExplicitValuesType;
};

export type InputParameterSizeRandomValuesType = {
  px: SizeRandomValuesType;
  percent: SizeRandomValuesType;
};

export type InputParameterSizeRangeValuesType = {
  px: SizeRangeValuesType;
  percent: SizeRangeValuesType;
};

export type InputParameterSizeDefaultType = {
  inputType: InputTypeEnum;
  unitType: UnitTypeEnum;
  explicitValues: InputParameterSizeExplicitValuesType;
  randomValues: InputParameterSizeRandomValuesType;
  rangeValues: InputParameterSizeRangeValuesType;
};

export const InputParameterSizeDefault: InputParameterSizeDefaultType = {
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

export const InputParameterSizeLengths = ({
  size,
}: {
  size: number;
}): InputParameterSizeDefaultType => {
  const defaultSize = InputParameterSizeDefault;
  const { explicitValues, ...currentSize } = defaultSize;

  // set the size on explicitValues and rangeValues
  explicitValues.px = size;
  explicitValues.percent = size;

  const newSize = {
    ...currentSize,
    explicitValues,
  };

  return newSize;
};
