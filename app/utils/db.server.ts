import { PrismaClient, DesignAttribute, InputParameter } from '@prisma/client';

// look to expand on this later
// https://github.com/goodeats/epic-pat-stack/blob/main/app/utils/db.server.ts

export const prisma = new PrismaClient();

// models
export type { DesignAttribute, InputParameter };

// enums from /prisma/schema.prisma
// edit: copy for type checking with zod forms
// seems importing doesn't work
export enum InputTypeEnum { // do not use, read comment
  explicit = 'explicit',
  random = 'random',
  range = 'range',
}
