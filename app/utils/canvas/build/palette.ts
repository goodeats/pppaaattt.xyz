import { DesignAttributeWithInputParameters } from '../../canvas-utils';
import { colorRandomHex } from '../../color-utils';
import {
  InputParameterPaletteExplicitValuesType,
  InputParameterPaletteRandomValuesType,
} from '../../types/input-parameter/palette';

const defaultValue = ['green'];

export const CanvasPalette = (
  designAttributes: DesignAttributeWithInputParameters[]
): string[] => {
  const palette = designAttributes.find(
    (attr) => attr.attributeType === 'palette'
  );
  if (!palette) {
    console.log('No palettes');
    return defaultValue;
  }

  const inputParameter = palette.inputParameters[0];
  if (!inputParameter) {
    console.log('No input parameters');
    return defaultValue;
  }
  const { inputType } = inputParameter;

  const inputValues = inputParameter[`${inputType}Values`];
  if (!inputValues) {
    console.log('No input type');
    return defaultValue;
  }

  const unitType = inputParameter.unitType as 'hexcode';
  if (!unitType) {
    console.log('No unit type');
    return defaultValue;
  }

  if (
    typeof inputValues === 'object' &&
    inputValues !== null &&
    unitType in inputValues
  ) {
    if (inputType === 'explicit') {
      return paletteExplicit({
        inputValues: inputValues as InputParameterPaletteExplicitValuesType,
        unitType,
      });
    } else if (inputType === 'random') {
      return paletteRandom({
        inputValues: inputValues as InputParameterPaletteRandomValuesType,
        unitType,
      });
    }

    return defaultValue;
  } else {
    console.log(
      `${inputType}Values is not an object or does not contain unitType`
    );
    return defaultValue;
  }
};

type paletteExplicitType = {
  inputValues: InputParameterPaletteExplicitValuesType;
  unitType: 'hexcode';
};

const paletteExplicit = ({
  inputValues,
  unitType,
}: paletteExplicitType): string[] => {
  const unitValues = inputValues[unitType as keyof typeof inputValues];
  if (!unitValues) {
    console.log(`No ${unitType} values`);
    return defaultValue;
  }

  return unitValues as string[];
};

type paletteRandomType = {
  inputValues: InputParameterPaletteRandomValuesType;
  unitType: 'hexcode';
};

const paletteRandom = ({
  inputValues,
  unitType,
}: paletteRandomType): string[] => {
  const randomPaletteCount = inputValues[unitType as keyof typeof inputValues];
  if (!randomPaletteCount) {
    console.log(`No ${unitType} values`);
    return defaultValue;
  }

  const randomColors = [];
  for (let i = 0; i < randomPaletteCount; i++) {
    randomColors.push(colorRandomHex());
  }

  return randomColors;
};
