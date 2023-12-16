import { DesignAttributeWithInputParameters } from '../../canvas-utils';

export const CanvasDimensions = (
  designAttributes: DesignAttributeWithInputParameters[],
  dimension: 'width' | 'height'
): number => {
  const defaultValue = 400;

  const container = designAttributes.find(
    (attr) => attr.attributeType === 'container'
  );
  if (!container) {
    console.log('No containers');
    return defaultValue;
  }

  const inputParameter = container.inputParameters[0];
  if (!inputParameter) {
    console.log('No input parameters');
    return defaultValue;
  }

  const inputValues = inputParameter[`${inputParameter.inputType}Values`];
  if (!inputValues) {
    console.log('No input type');
    return defaultValue;
  }

  const unitType = inputParameter.unitType as 'px' | 'percent';
  if (!unitType) {
    console.log('No unit type');
    return defaultValue;
  }

  if (unitType === 'percent') {
    console.log('Percent cannot be used for outer layer');
    return defaultValue;
  }

  if (
    typeof inputValues === 'object' &&
    inputValues !== null &&
    unitType in inputValues
  ) {
    const unitValues = inputValues[unitType as keyof typeof inputValues];
    if (!unitValues) {
      console.log(`No ${unitType} values`);
      return defaultValue;
    }

    if (typeof unitValues === 'object' && dimension in unitValues) {
      return (unitValues as { [K in 'width' | 'height']: number })[dimension];
    } else {
      console.log(
        `${inputParameter.inputType} ${unitType} does not have a ${dimension} property`
      );
      return defaultValue;
    }
  } else {
    console.log(
      `${inputParameter.inputType}Values is not an object or does not contain unitType`
    );
    return defaultValue;
  }
};
