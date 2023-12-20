import { BuildDimensions } from '~/lib/utils/build-structure/build-attributes';

type ImageLoadProps = {
  imageSrc: string;
};

export const ImageLoad = async ({
  imageSrc,
}: ImageLoadProps): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      resolve(img);
    };

    img.onerror = () => {
      reject(new Error(`Failed to load image from source: ${imageSrc}`));
    };

    // https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image
    // add this so we can use the image in a canvas
    // and not get a tainted canvas error
    img.crossOrigin = 'anonymous';

    img.src = imageSrc;
  });
};

type CanvasGetImageCoordsProps = {
  canvas: HTMLCanvasElement;
  img: HTMLImageElement;
  style: 'centered' | 'stretched';
};

type CanvasDrawImageCoordsMinimalProps = {
  canvas: HTMLCanvasElement;
  img: HTMLImageElement;
};

export type ImageCoords = {
  x: number;
  y: number;
  width: number;
  height: number;
};

function CanvasDrawImageCoordsCentered({
  canvas,
  img,
}: CanvasDrawImageCoordsMinimalProps): ImageCoords {
  const xCentered = (canvas.width - img.width) / 2;
  const yCentered = (canvas.height - img.height) / 2;

  return {
    x: xCentered,
    y: yCentered,
    width: img.width,
    height: img.height,
  };
}

function CanvasDrawImageCoordsStretched({
  canvas,
  img,
}: CanvasDrawImageCoordsMinimalProps): ImageCoords {
  return {
    x: 0,
    y: 0,
    width: canvas.width,
    height: canvas.height,
  };
}

export function CanvasGetImageCoords({
  canvas,
  img,
  style,
}: CanvasGetImageCoordsProps): ImageCoords {
  switch (style) {
    case 'centered':
      return CanvasDrawImageCoordsCentered({ canvas, img });
    case 'stretched':
    default:
      return CanvasDrawImageCoordsStretched({ canvas, img });
  }
}

type CanvasDrawImageCoordsProps = {
  ctx: CanvasRenderingContext2D;
  img: HTMLImageElement;
  coords: ImageCoords;
};

export async function CanvasDrawImageToContext({
  ctx,
  img,
  coords,
}: CanvasDrawImageCoordsProps) {
  // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage

  const { x, y, width, height } = coords;
  ctx.drawImage(img, x, y, width, height);
}

type CanvasDrawProps = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  dimensions: BuildDimensions;
};

export const CanvasDrawImage = async ({
  canvas,
  ctx,
  dimensions,
}: CanvasDrawProps) => {
  const { width, height } = dimensions;
  const imageSrc = 'http://localhost:5173/images/pepper.jpeg';
  const img = await ImageLoad({ imageSrc });

  // Get coordinates for image by layout style
  const coords = CanvasGetImageCoords({
    canvas,
    img,
    style: 'stretched',
  });

  CanvasDrawImageToContext({ ctx, img, coords });
};
