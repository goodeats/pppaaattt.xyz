import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function findOrCreateFirstLayer() {
  let layer = await prisma.layer.findFirst();
  if (!layer) {
    layer = await createLayer();
  }
  return layer;
}

export async function createLayer() {
  const newLayer = await prisma.layer.create({
    data: {
      title: 'New Layer',
    },
  });
  return newLayer;
}

export async function findLayerById(id: string) {
  const layer = await prisma.layer.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      title: true,
    },
  });
  return layer;
}
