import { CanvasDimensions } from './canvas/build/dimensions';
import { CanvasPalette } from './canvas/build/palette';
import { IDesignAttribute, IInputParameter } from './db.server';

export type DesignAttributeWithInputParameters = Pick<
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

export const CanvasWidth = ({ designAttributes }: CanvasProps): number => {
  return CanvasDimensions(designAttributes, 'width');
};

export const CanvasHeight = ({ designAttributes }: CanvasProps): number => {
  return CanvasDimensions(designAttributes, 'height');
};

export const CanvasBackground = ({ designAttributes }: CanvasProps): string => {
  const colors = CanvasPalette(designAttributes);
  return colors[0];
};
