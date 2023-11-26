export type PaletteDesignAttributeExplicitValue = {
  colors: string[];
};

export const PaletteDesignAttributeExplicitValueDefault: PaletteDesignAttributeExplicitValue =
  {
    colors: ['#ff0000', '#00ff00', '#0000ff'],
  };

export type PaletteDesignAttributeRandomValues = {
  colorsCount: number;
};

export const PaletteDesignAttributeRandomValuesDefault: PaletteDesignAttributeRandomValues =
  {
    colorsCount: 3,
  };

export type PaletteDesignAttributeRangeValues = {
  color: {
    min: string;
    max: string;
  };
};

// not sure how to range colors just yet
// will leave it out in the UI for now
export const PaletteDesignAttributeRangeValuesDefault: PaletteDesignAttributeRangeValues =
  {
    color: {
      min: '#000000',
      max: '#ffffff',
    },
  };

export type PaletteDesignAttributeInputParameters = {
  inputType: string;
  explicitValue?: PaletteDesignAttributeExplicitValue;
  randomValues?: PaletteDesignAttributeRandomValues;
  rangeValues?: PaletteDesignAttributeRangeValues;
};

export type PaletteDesignAttribute = {
  attributeType: string;
  inputParameters: PaletteDesignAttributeInputParameters;
};

export const PaletteDesignAttributeDefault: PaletteDesignAttribute = {
  attributeType: 'palette',
  inputParameters: {
    inputType: 'explicit',
    explicitValue: PaletteDesignAttributeExplicitValueDefault,
    randomValues: PaletteDesignAttributeRandomValuesDefault,
    rangeValues: PaletteDesignAttributeRangeValuesDefault,
  },
};
