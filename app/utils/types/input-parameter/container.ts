// Still to consider:
// - How to handle the case where the container is smaller than the image
// - How to handle the case where the container is larger than the image
// - How to handle the case where the container is the same size as the image
// - How to handle weights for the random values
// - How to handle steps for the range values

type ContainerExplicitValuesType = {
  width: number;
  height: number;
  left: number;
  top: number;
};

type ContainerRandomValuesType = {
  width: number[];
  height: number[];
  left: number[];
  top: number[];
};

type ContainerRangeValuesType = {
  width: number[];
  height: number[];
  left: number[];
  top: number[];
};

enum InputTypeEnum {
  explicit = 'explicit',
  random = 'random',
  range = 'range',
}

enum UnitTypeEnum {
  px = 'px',
  percent = 'percent',
}

export type InputParameterContainerExplicitValuesType = {
  px: ContainerExplicitValuesType;
  percent: ContainerExplicitValuesType;
};

export type InputParameterContainerRandomValuesType = {
  px: ContainerRandomValuesType;
  percent: ContainerRandomValuesType;
};

export type InputParameterContainerRangeValuesType = {
  px: ContainerRangeValuesType;
  percent: ContainerRangeValuesType;
};

export type InputParameterContainerDefaultType = {
  inputType: InputTypeEnum;
  unitType: UnitTypeEnum;
  explicitValues: InputParameterContainerExplicitValuesType;
  randomValues: InputParameterContainerRandomValuesType;
  rangeValues: InputParameterContainerRangeValuesType;
};

export const InputParameterContainerDefault: InputParameterContainerDefaultType =
  {
    inputType: InputTypeEnum.explicit,
    unitType: UnitTypeEnum.px,
    explicitValues: {
      px: {
        width: 1000,
        height: 1000,
        left: 0,
        top: 0,
      },
      percent: {
        width: 100,
        height: 100,
        left: 0,
        top: 0,
      },
    },
    randomValues: {
      px: {
        width: [0, 250, 500, 750, 1000],
        height: [0, 250, 500, 750, 1000],
        left: [0, 250, 500, 750, 1000],
        top: [0, 250, 500, 750, 1000],
      },
      percent: {
        width: [0, 25, 50, 75, 100],
        height: [0, 25, 50, 75, 100],
        left: [0, 25, 50, 75, 100],
        top: [0, 25, 50, 75, 100],
      },
    },
    rangeValues: {
      px: {
        width: [0, 1000],
        height: [0, 1000],
        left: [-10, 10],
        top: [-10, 10],
      },
      percent: {
        width: [0, 100],
        height: [0, 100],
        left: [-10, 10],
        top: [-10, 10],
      },
    },
  };
