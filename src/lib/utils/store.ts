import {
  BackgroundDesignAttribute,
  BackgroundDesignAttributeDefault,
} from './design-attributes/background';
import {
  ContainerDesignAttribute,
  ContainerDesignAttributeDefault,
} from './design-attributes/container';
import {
  PaletteDesignAttribute,
  PaletteDesignAttributeDefault,
} from './design-attributes/palette';

export enum InputParameterType {
  EXPLICIT = 'explicit',
  RANDOM = 'random',
  RANGE = 'range',
}

export type DesignAttribute =
  | ContainerDesignAttribute
  | BackgroundDesignAttribute
  | PaletteDesignAttribute;

export type LayerStore = {
  depth: number;
  designAttributes: DesignAttribute[];
  children: LayerStore[];
};

export const LayerStoreDefault: LayerStore = {
  depth: 0,
  designAttributes: [
    ContainerDesignAttributeDefault,
    BackgroundDesignAttributeDefault,
    PaletteDesignAttributeDefault,
  ],
  children: [],
};
