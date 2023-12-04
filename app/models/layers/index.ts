import { PrismaClient, Layer } from '@prisma/client';

const prisma = new PrismaClient();

export async function findLayers(): Promise<Layer[]> {
  const layers = await prisma.layer.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      parentId: true,
      parent: {
        select: {
          id: true,
          title: true,
          description: true,
          parentId: true,
        },
      },
      children: {
        select: {
          id: true,
          title: true,
          description: true,
          parentId: true,
        },
      },
      designAttributes: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return layers;
}

export async function findOrCreateFirstLayer(): Promise<Layer> {
  let layer = await prisma.layer.findFirst();
  if (!layer) {
    layer = await createLayer();
  }
  return layer;
}

export async function createLayer(): Promise<Layer> {
  const randomFourCharacterString = Math.random().toString(36).substring(2, 6);
  const newLayer = await prisma.layer.create({
    data: {
      title: `New Layer - ${randomFourCharacterString}`,
    },
  });
  return newLayer;
}

export async function findLayerById(id: string): Promise<Layer | null> {
  const layer = await prisma.layer.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      title: true,
      description: true,
      parentId: true,
      parent: {
        select: {
          id: true,
          title: true,
          description: true,
          parentId: true,
        },
      },
      children: {
        select: {
          id: true,
          title: true,
          description: true,
          parentId: true,
        },
      },
      designAttributes: true,
    },
  });

  return layer;
}