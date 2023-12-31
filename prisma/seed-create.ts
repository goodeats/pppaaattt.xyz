import {
  BuildAttributes,
  BuildBackground,
  BuildDimensions,
  BuildImage,
  BuildPalette,
} from '~/lib/utils/build-structure/build-attributes';
import { createPassword } from '~/utils/db-utils';
import { prisma } from '~/utils/db.server';
import {
  InputParameterContainerAspectRatio,
  InputParameterContainerDefault,
} from '~/utils/types/input-parameter/container';
import {
  InputParameterPaletteColors,
  InputParameterPaletteDefault,
  defaultPaletteColors,
} from '~/utils/types/input-parameter/palette';
import {
  InputParameterSizeDefault,
  InputParameterSizeLengths,
} from '~/utils/types/input-parameter/size';

export const seedUsers = async () => {
  console.log('Seeding users...');
  const usersSeedJson = [
    {
      email: 'pat@pppaaattt.xyz',
      username: 'pat',
      name: 'Pat',
      password: 'password',
    },
  ];

  const promises = usersSeedJson.map(async (user) => {
    const { email, username, name, password } = user;
    const exists = await prisma.user.findFirst({
      where: { email },
    });

    if (!exists) {
      await prisma.user.create({
        data: {
          email,
          username,
          name,
          password: { create: createPassword(password) },
        },
      });
    }
  });

  await Promise.all(promises);
  console.log('Users seeded.');
};

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

export const seedLayerImages = async () => {
  console.log('Seeding layer images...');

  const layerImagesSeedJson = [
    {
      url: 'http://localhost:5173/images/pepper.jpeg',
      altText: 'pepper!',
      layout: 'stretch-height',
      display: true,
    },
  ];

  const layer = await prisma.layer.findFirst({
    where: { title: 'Default Layer' },
  });

  if (!layer) {
    throw new Error('Default layer not found.');
  }

  const promises = layerImagesSeedJson.map(async (layerImage) => {
    const { url, altText, layout, display } = layerImage;
    const exists = await prisma.layerImage.findFirst({
      where: { url },
    });

    if (!exists) {
      await prisma.layerImage.create({
        data: {
          url,
          altText,
          layout,
          display,
          layerId: layer.id,
        },
      });
    }
  });

  await Promise.all(promises);
  console.log('Layer images seeded.');
};

export const seedDesignAttributes = async () => {
  console.log('Seeding design attributes...');
  await seedContainerDesignAttributes();
  await seedPaletteDesignAttributes();
  await seedBackgroundDesignAttributes();
  await seedSizeDesignAttributes();
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

export const seedBackgroundDesignAttributes = async () => {
  console.log('Seeding background design attributes...');
  // haha typescript is something else sometimes
  // TODO: refactor
  enum InputTypeEnum {
    explicit = 'explicit',
  }
  enum UnitType {
    none = 'none',
    random = 'random',
    palette = 'palette',
    paletteShuffle = 'paletteShuffle',
    paletteRandom = 'paletteRandom',
    positionPixel = 'positionPixel',
  }

  const defaultBackgroundParameters = {
    inputType: InputTypeEnum.explicit,
    explicitValues: {},
    randomValues: {},
    rangeValues: {},
  };

  const backgroundSeedJson = [
    {
      title: 'No Background',
      description: 'The background is transparent',
      inputParameters: {
        ...defaultBackgroundParameters,
        unitType: UnitType.none,
      },
    },
    {
      title: 'Random Background',
      description: 'The background is a random color',
      inputParameters: {
        ...defaultBackgroundParameters,
        unitType: UnitType.random,
      },
    },
    {
      title: 'Palette Background',
      description: 'The background is the first color from the palette',
      inputParameters: {
        ...defaultBackgroundParameters,
        unitType: UnitType.palette,
      },
    },
    {
      title: 'Palette Shuffle Background',
      description: 'The background is any color from the palette',
      inputParameters: {
        ...defaultBackgroundParameters,
        unitType: UnitType.paletteShuffle,
      },
    },
    {
      title: 'Palette Random Background',
      description: 'The background is a random color from the palette',
      inputParameters: {
        ...defaultBackgroundParameters,
        unitType: UnitType.paletteRandom,
      },
    },
    {
      title: 'Position Pixel Background',
      description: 'The background is the color at the position pixel',
      inputParameters: {
        ...defaultBackgroundParameters,
        unitType: UnitType.positionPixel,
      },
    },
  ];

  const promises = backgroundSeedJson.map(async (designAttribute) => {
    const { title, description, inputParameters } = designAttribute;
    const exists = await prisma.designAttribute.findFirst({
      where: { title },
    });

    if (!exists) {
      await prisma.designAttribute.create({
        data: {
          title,
          description,
          attributeType: 'background',
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

export const seedSizeDesignAttributes = async () => {
  console.log('Seeding size design attributes...');
  // Hack: stringify default first
  // bug for subsequent sizes change the default values even after the const is defined
  // fix later since this works
  // due to all being completed after in Promise.all
  const sizeDefault = JSON.parse(JSON.stringify(InputParameterSizeDefault));
  const sizeXs = JSON.parse(
    JSON.stringify(
      InputParameterSizeLengths({
        size: 1,
      })
    )
  );
  const sizeSm = JSON.parse(
    JSON.stringify(
      InputParameterSizeLengths({
        size: 5,
      })
    )
  );
  const sizeLg = JSON.parse(
    JSON.stringify(
      InputParameterSizeLengths({
        size: 20,
      })
    )
  );
  const sizeXl = JSON.parse(
    JSON.stringify(
      InputParameterSizeLengths({
        size: 33.3,
      })
    )
  );

  const containersSeedJson = [
    {
      title: 'Default Size',
      description: 'A template of default settings for a size attribute',
      inputParameters: sizeDefault,
    },
    {
      title: 'Size XS',
      description: 'A template of a size with an aspect ratio of 9:16',
      inputParameters: sizeXs,
    },
    {
      title: 'Size SM',
      description: 'A template of a size with an aspect ratio of 9:16',
      inputParameters: sizeSm,
    },
    {
      title: 'Size LG',
      description: 'A template of a size with an aspect ratio of 9:16',
      inputParameters: sizeLg,
    },
    {
      title: 'Size XL',
      description: 'A template of a size with an aspect ratio of 9:16',
      inputParameters: sizeXl,
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
          attributeType: 'size',
          inputParameters: {
            create: inputParameters,
          },
        },
      });
    }
  });

  await Promise.all(promises);
  console.log('Size design attributes seeded.');
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

  // find default container
  const size = await prisma.designAttribute.findFirst({
    where: { title: 'Default Size' },
    include: { inputParameters: true },
  });

  if (!size) {
    throw new Error('Default size not found.');
  }

  console.log('adding default size to default layer...');
  await prisma.designAttributesOnLayers.create({
    data: {
      layerId: layer.id,
      designAttributeId: size.id,
    },
  });
  console.log('default size added to default layer.');

  // update layer build attributes for palette
  const buildAttributes = (layer.buildAttributes || {}) as BuildAttributes;

  // IG Story 9:16
  const buildDimensions: BuildDimensions = {
    width: 1080,
    height: 1920,
    format: 'px',
  };
  // 16:9
  // const buildDimensions: BuildDimensions = {
  //   width: 1920,
  //   height: 1080,
  //   format: 'px',
  // };

  // 4:3
  // const buildDimensions: BuildDimensions = {
  //   width: 2400,
  //   height: 1800,
  //   format: 'px',
  // };

  // 8.5 x 11
  // const buildDimensions: BuildDimensions = {
  //   width: 2550,
  //   height: 3300,
  //   format: 'px',
  // };

  // // https://shotkit.com/how-big-is-a-4x6-photo/
  // const buildDimensions: BuildDimensions = {
  //   width: 1800,
  //   height: 1200,
  //   format: 'px',
  // };
  // // https://www.docucopies.com/image-resolution/#:~:text=How%20many%20pixels%20is%208.5,artwork%20at%203400px%20x%204400px.
  // const buildDimensions: BuildDimensions = {
  //   width: 255 * 10,
  //   height: 330 * 10,
  //   format: 'px',
  // };
  const buildPalette: BuildPalette = {
    colors: defaultPaletteColors,
    format: 'hex',
  };
  const buildBackground: BuildBackground = {
    colorStyle: 'palette',
  };
  const buildLayerImage: BuildImage = {
    url: 'http://localhost:5173/images/pepper.jpeg',
    layout: 'stretch-height',
    display: true,
  };
  const buildSize = {
    size: 10,
    format: 'percent',
  };

  console.log('updating layer build attributes...');
  await prisma.layer.update({
    where: { id: layer.id },
    data: {
      buildAttributes: {
        ...buildAttributes,
        dimensions: buildDimensions,
        palette: buildPalette,
        background: buildBackground,
        image: buildLayerImage,
        size: buildSize,
      },
    },
  });
  console.log('layer build attributes updated.');

  console.log('Design attributes on layers seeded.');
};
