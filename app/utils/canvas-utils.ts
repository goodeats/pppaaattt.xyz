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

type Canvasprops = {
  designAttributes: DesignAttributeWithInputParameters[];
};

export const CanvasWidth = ({ designAttributes }: Canvasprops): number => {
  const defaultValue = 400;

  const containers = designAttributes.filter(
    (designAttribute) => designAttribute.attributeType === 'container'
  );

  if (containers.length === 0) {
    console.log('no containers');
    return defaultValue;
  }

  const container = containers[0];
  const { inputParameters } = container;

  if (inputParameters.length === 0) {
    console.log('no input parameters');
    return defaultValue;
  }

  const inputParameter = inputParameters[0];
  const { inputType } = inputParameter;

  const inputValues = inputParameter[`${inputType}Values`];
  if (!inputValues) {
    console.log('no input type');
    return defaultValue;
  }

  const unitType = inputParameter.unitType as 'px' | 'percent';
  if (!unitType) {
    console.log('no unit type');
    return defaultValue;
  }

  if (
    typeof inputValues === 'object' &&
    inputValues !== null &&
    unitType in inputValues
  ) {
    const unitValues = inputValues[unitType as keyof typeof inputValues];
    if (!unitValues) {
      console.log(`no ${unitType} values`);
      return defaultValue;
    }
    if (
      typeof unitValues === 'object' &&
      'width' in unitValues &&
      typeof unitValues.width === 'number'
    ) {
      return unitValues.width;
    } else {
      console.log(
        `${inputType} ${unitType} does not have a width property or width is not a number`
      );
      return defaultValue;
    }
  } else {
    console.log(
      `${inputType}Values is not an object or does not contain unitType`
    );
    return defaultValue;
  }
};

export const CanvasHeight = ({ designAttributes }: Canvasprops): number => {
  const defaultValue = 400;

  const containers = designAttributes.filter(
    (designAttribute) => designAttribute.attributeType === 'container'
  );

  if (containers.length === 0) {
    console.log('no containers');
    return defaultValue;
  }

  const container = containers[0];
  const { inputParameters } = container;

  if (inputParameters.length === 0) {
    console.log('no input parameters');
    return defaultValue;
  }

  const inputParameter = inputParameters[0];
  const { inputType } = inputParameter;

  const inputValues = inputParameter[`${inputType}Values`];
  if (!inputValues) {
    console.log('no input type');
    return defaultValue;
  }

  const unitType = inputParameter.unitType as 'px' | 'percent';
  if (!unitType) {
    console.log('no unit type');
    return defaultValue;
  }

  if (
    typeof inputValues === 'object' &&
    inputValues !== null &&
    unitType in inputValues
  ) {
    const unitValues = inputValues[unitType as keyof typeof inputValues];
    if (!unitValues) {
      console.log(`no ${unitType} values`);
      return defaultValue;
    }
    if (
      typeof unitValues === 'object' &&
      'height' in unitValues &&
      typeof unitValues.height === 'number'
    ) {
      return unitValues.height;
    } else {
      console.log(`${inputType} ${unitType} does not have a height property`);
      return defaultValue;
    }
  } else {
    console.log(
      `${inputType}Values is not an object or does not contain unitType`
    );
    return defaultValue;
  }
};
