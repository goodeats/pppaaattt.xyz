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
  width: {
    min: number;
    max: number;
  };
  height: {
    min: number;
    max: number;
  };
  left: {
    min: number;
    max: number;
  };
  top: {
    min: number;
    max: number;
  };
};

export type InputParameterContainerDefaultType = {
  type: 'explicit';
  explicitValue: {
    px: ContainerExplicitValuesType;
    percent: ContainerExplicitValuesType;
  };
  randomValues: {
    px: ContainerRandomValuesType;
    percent: ContainerRandomValuesType;
  };
  rangeValues: {
    px: ContainerRangeValuesType;
    percent: ContainerRangeValuesType;
  };
};

export const InputParameterContainerDefault: InputParameterContainerDefaultType =
  {
    type: 'explicit',
    explicitValue: {
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
        width: {
          min: 0,
          max: 1000,
        },
        height: {
          min: 0,
          max: 1000,
        },
        left: {
          min: 0,
          max: 1000,
        },
        top: {
          min: 0,
          max: 1000,
        },
      },
      percent: {
        width: {
          min: 0,
          max: 100,
        },
        height: {
          min: 0,
          max: 100,
        },
        left: {
          min: 0,
          max: 100,
        },
        top: {
          min: 0,
          max: 100,
        },
      },
    },
  };
