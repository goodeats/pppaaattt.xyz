export type BackgroundDesignAttributeExplicitValue = {
  color: string;
};

export const BackgroundDesignAttributeExplicitValueDefault: BackgroundDesignAttributeExplicitValue =
  {
    color: '#ffffff',
  };

export type BackgroundDesignAttributeRandomValues = {
  color: {
    min: string;
    max: string;
  };
};

export const BackgroundDesignAttributeRandomValuesDefault: BackgroundDesignAttributeRandomValues =
  {
    color: {
      min: '#000000',
      max: '#ffffff',
    },
  };

export type BackgroundDesignAttributeRangeValues = {
  color: {
    min: string;
    max: string;
  };
};

export const BackgroundDesignAttributeRangeValuesDefault: BackgroundDesignAttributeRangeValues =
  {
    color: {
      min: '#000000',
      max: '#ffffff',
    },
  };

export type BackgroundDesignAttributeInputParameters = {
  inputType: string;
  explicitValue?: BackgroundDesignAttributeExplicitValue;
  randomValues?: BackgroundDesignAttributeRandomValues;
  rangeValues?: BackgroundDesignAttributeRangeValues;
};

export type BackgroundDesignAttribute = {
  attributeType: string;
  inputParameters: BackgroundDesignAttributeInputParameters;
};

export const BackgroundDesignAttributeDefault: BackgroundDesignAttribute = {
  attributeType: 'background',
  inputParameters: {
    inputType: 'explicit',
    explicitValue: BackgroundDesignAttributeExplicitValueDefault,
    randomValues: BackgroundDesignAttributeRandomValuesDefault,
    rangeValues: BackgroundDesignAttributeRangeValuesDefault,
  },
};
