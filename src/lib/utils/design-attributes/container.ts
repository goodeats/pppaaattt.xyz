import { InputParameterType } from '../store';

export type ContainerDesignAttributeExplicitValue = {
  width: number;
  height: number;
  left: number;
  top: number;
};

export const ContainerDesignAttributeExplicitValueDefault: ContainerDesignAttributeExplicitValue =
  {
    width: 1000,
    height: 1000,
    left: 0,
    top: 0,
  };

export type ContainerDesignAttributeRandomValues = {
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

export const ContainerDesignAttributeRandomValuesDefault: ContainerDesignAttributeRandomValues =
  {
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
  };

export type ContainerDesignAttributeRangeValues = {
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

export const ContainerDesignAttributeRangeValuesDefault: ContainerDesignAttributeRangeValues =
  {
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
  };

export type ContainerDesignAttributeInputParameters = {
  inputType: InputParameterType | string;
  explicitValue?: ContainerDesignAttributeExplicitValue;
  randomValues?: ContainerDesignAttributeRandomValues;
  rangeValues?: ContainerDesignAttributeRangeValues;
};

export type ContainerDesignAttribute = {
  attributeType: string;
  inputParameters: ContainerDesignAttributeInputParameters;
};

export const ContainerDesignAttributeDefault: ContainerDesignAttribute = {
  attributeType: 'container',
  inputParameters: {
    inputType: 'explicit',
    explicitValue: ContainerDesignAttributeExplicitValueDefault,
    randomValues: ContainerDesignAttributeRandomValuesDefault,
    rangeValues: ContainerDesignAttributeRangeValuesDefault,
  },
};
