import {
  PrismaClient,
  DesignAttribute,
  InputParameter,
  Layer,
  LayerImage,
} from '@prisma/client';

// look to expand on this later
// https://github.com/goodeats/epic-pat-stack/blob/main/app/utils/db.server.ts

export const prisma = new PrismaClient();

// models
export type { DesignAttribute, InputParameter, LayerImage };

// enums from /prisma/schema.prisma
// edit: copy for type checking with zod forms
// seems importing doesn't work
export enum InputTypeEnum { // do not use, read comment
  explicit = 'explicit',
  random = 'random',
  range = 'range',
}

export interface ILayer extends Layer {
  designAttributes?: DesignAttribute[];
  image?: LayerImage;
}

export interface IDesignAttribute extends DesignAttribute {
  inputParameters?: InputParameter[];
}

export interface IInputParameter extends InputParameter {
  designAttribute?: DesignAttribute;
}

export interface ILayerImage extends LayerImage {
  layer?: Layer;
}
