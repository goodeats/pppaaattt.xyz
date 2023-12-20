import { PrismaClient } from '@prisma/client';
import {
  BuildAttributes,
  BuildDimensions,
  BuildPalette,
} from '~/lib/utils/build-structure/build-attributes';
import {
  InputParameterContainerAspectRatio,
  InputParameterContainerDefault,
} from '~/utils/types/input-parameter/container';
import {
  InputParameterPaletteColors,
  InputParameterPaletteDefault,
  defaultPaletteColors,
} from '~/utils/types/input-parameter/palette';
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
  // Hack: stringify default first
  // bug for subsequent palettes change the default values even after the const is defined
  // fix later since this works
  const containerDefault = JSON.parse(
    JSON.stringify(InputParameterContainerDefault)
  );
  const containerRatio = InputParameterContainerAspectRatio({
    aspectRatio: '9:16',
    multiplier: 0.1,
    values: 'explicit',
  });

  const containersSeedJson = [
    {
      title: 'Default Container',
      description: 'A template of default settings for a container attribute',
      inputParameters: containerDefault,
    },
    {
      title: '9:16 Container',
      description: 'A template of a container with an aspect ratio of 9:16',
      inputParameters: containerRatio,
    },
  ];

  const promises = containersSeedJson.map(async (designAttribute) => {
    const { title, description, inputParameters } = designAttribute;
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
            create: inputParameters,
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
  // Hack: stringify default first
  // bug for subsequent palettes change the default values even after the const is defined
  // fix later since this works
  const paletteDefault = JSON.parse(
    JSON.stringify(InputParameterPaletteDefault)
  );
  const paletteRGB = JSON.parse(
    JSON.stringify(
      InputParameterPaletteColors({
        colors: ['#ff0000', '#00ff00', '#0000ff'],
      })
    )
  );
  const paletteBnW = JSON.parse(
    JSON.stringify(
      InputParameterPaletteColors({
        colors: ['#FFFFFF', '#000000'],
      })
    )
  );

  const palettesSeedJson = [
    {
      title: 'Default Palette',
      description: 'A template of default settings for a palette attribute',
      inputParameters: paletteDefault,
    },
    {
      title: 'RGB Palette',
      description: 'A template of a palette with primary colors',
      inputParameters: paletteRGB,
    },
    {
      title: 'B&W Palette',
      description: 'A template of a palette with black and white colors',
      inputParameters: paletteBnW,
    },
  ];

  const promises = palettesSeedJson.map(async (designAttribute) => {
    const { title, description, inputParameters } = designAttribute;
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
            create: inputParameters,
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

  // find default container
  const container = await prisma.designAttribute.findFirst({
    where: { title: 'Default Container' },
    include: { inputParameters: true },
  });

  if (!container) {
    throw new Error('Default container not found.');
  }

  console.log('adding default container to default layer...');
  await prisma.designAttributesOnLayers.create({
    data: {
      layerId: layer.id,
      designAttributeId: container.id,
    },
  });
  console.log('default container added to default layer.');

  // find default palette
  const palette = await prisma.designAttribute.findFirst({
    where: { title: 'Default Palette' },
  });

  if (!palette) {
    throw new Error('Default palette not found.');
  }

  console.log('adding default palette to default layer...');
  await prisma.designAttributesOnLayers.create({
    data: {
      layerId: layer.id,
      designAttributeId: palette.id,
    },
  });
  console.log('default palette added to default layer.');

  // update layer build attributes for palette
  const buildAttributes = (layer.buildAttributes || {}) as BuildAttributes;

  const buildDimensions: BuildDimensions = {
    width: 1000,
    height: 1000,
    format: 'px',
  };
  const buildPalette: BuildPalette = {
    colors: defaultPaletteColors,
    format: 'hex',
  };

  console.log('updating layer build attributes...');
  await prisma.layer.update({
    where: { id: layer.id },
    data: {
      buildAttributes: {
        ...buildAttributes,
        dimensions: buildDimensions,
        palette: buildPalette,
      },
    },
  });
  console.log('layer build attributes updated.');

  console.log('Design attributes on layers seeded.');
};
