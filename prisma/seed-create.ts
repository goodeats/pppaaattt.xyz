import { PrismaClient } from '@prisma/client';
import {
  InputParameterContainerAspectRatio,
  InputParameterContainerDefault,
} from '~/utils/types/input-parameter/container';
import { InputParameterPaletteDefault } from '~/utils/types/input-parameter/palette';
const prisma = new PrismaClient();

export const seedLayers = async () => {
  console.log('Seeding layers...');
  const layersSeedJson = [
    {
      title: 'Default Layer',
      description: 'A template of default settings for a root layer',
    },
    {
      title: 'Empty Layer',
      description: 'A template of a root layer with no design attributes',
    },
  ];

  const promises = layersSeedJson.map(async (layer) => {
    const { title, description } = layer;
    const exists = await prisma.layer.findFirst({
      where: { title },
    });

    if (!exists) {
      await prisma.layer.create({
        data: {
          title,
          description,
        },
      });
    }
  });

  await Promise.all(promises);
  console.log('Layers seeded.');
};

export const seedDesignAttributes = async () => {
  console.log('Seeding design attributes...');
  await seedContainerDesignAttributes();
  await seedPaletteDesignAttributes();
  console.log('Design attributes seeded.');
};

export const seedContainerDesignAttributes = async () => {
  console.log('Seeding container design attributes...');
  const containersSeedJson = [
    {
      title: 'Default Container',
      description: 'A template of default settings for a container attribute',
      inputParameters: InputParameterContainerDefault,
    },
    {
      title: '9:16 Container',
      description: 'A template of a container with an aspect ratio of 9:16',
      inputParameters: InputParameterContainerAspectRatio({
        aspectRatio: '9:16',
        multiplier: 0.1,
        values: 'explicit',
      }),
    },
  ];

  const promises = containersSeedJson.map(async (designAttribute) => {
    const { title, description } = designAttribute;
    const exists = await prisma.designAttribute.findFirst({
      where: { title },
    });

    if (!exists) {
      await prisma.designAttribute.create({
        data: {
          title,
          description,
          attributeType: 'container',
          inputParameters: {
            create: InputParameterContainerDefault,
          },
        },
      });
    }
  });

  await Promise.all(promises);
  console.log('Container design attributes seeded.');
};

export const seedPaletteDesignAttributes = async () => {
  console.log('Seeding palette design attributes...');
  const palettesSeedJson = [
    {
      title: 'Default Palette',
      description: 'A template of default settings for a palette attribute',
    },
  ];

  const promises = palettesSeedJson.map(async (designAttribute) => {
    const { title, description } = designAttribute;
    const exists = await prisma.designAttribute.findFirst({
      where: { title },
    });

    if (!exists) {
      await prisma.designAttribute.create({
        data: {
          title,
          description,
          attributeType: 'palette',
          inputParameters: {
            create: InputParameterPaletteDefault,
          },
        },
      });
    }
  });

  await Promise.all(promises);
  console.log('Palette design attributes seeded.');
};

export const seedDesignAttributesOnLayers = async () => {
  console.log('Seeding design attributes on layers...');

  const layer = await prisma.layer.findFirst({
    where: { title: 'Default Layer' },
  });

  if (!layer) {
    throw new Error('Default layer not found.');
  }

  const container = await prisma.designAttribute.findFirst({
    where: { title: 'Default Container' },
  });

  if (!container) {
    throw new Error('Default container not found.');
  }

  const newDesignAttribute = await prisma.designAttributesOnLayers.create({
    data: {
      layerId: layer.id,
      designAttributeId: container.id,
    },
  });

  console.log('Design attributes on layers seeded.');
};
