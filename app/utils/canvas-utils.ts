import { IDesignAttribute, IInputParameter } from './db.server';

type DesignAttributeWithInputParameters = Pick<
  IDesignAttribute,
  'id' | 'title' | 'attributeType'
> & {
  inputParameters: Pick<
    IInputParameter,
    | 'id'
    | 'inputType'
    | 'unitType'
    | 'explicitValues'
    | 'randomValues'
    | 'rangeValues'
  >[];
};

type CanvasProps = {
  designAttributes: DesignAttributeWithInputParameters[];
};

const findDimensionValue = (
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

export const CanvasWidth = ({ designAttributes }: CanvasProps): number => {
  return findDimensionValue(designAttributes, 'width');
};

export const CanvasHeight = ({ designAttributes }: CanvasProps): number => {
  return findDimensionValue(designAttributes, 'height');
};
