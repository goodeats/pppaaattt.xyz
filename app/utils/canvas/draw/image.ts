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
  style: 'centered' | 'stretched' | 'stretch-height' | 'stretch-width';
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

const ImageSideCenteredInCanvas = (canvasSide: number, imgSide: number) =>
  (canvasSide - imgSide) / 2;

// place the image as-is in the middle of the canvas
function CanvasDrawImageCoordsCentered({
  canvas,
  img,
}: CanvasDrawImageCoordsMinimalProps): ImageCoords {
  const xCentered = ImageSideCenteredInCanvas(canvas.width, img.width);
  const yCentered = ImageSideCenteredInCanvas(canvas.height, img.height);

  return {
    x: xCentered,
    y: yCentered,
    width: img.width,
    height: img.height,
  };
}

// stretch the image width and height to fit the canvas
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

// stretch the image height to fit the canvas
// keep the image aspect ratio, and center the image horizontally
function CanvasDrawImageCoordsStretchImageToCanvasHeight({
  canvas,
  img,
}: CanvasDrawImageCoordsMinimalProps): ImageCoords {
  // Calculate the aspect ratio of the image.
  const aspectRatio = img.width / img.height;

  // Calculate the new width of the image based on the canvas height and image aspect ratio.
  const newWidth = canvas.height * aspectRatio;

  const xCentered = ImageSideCenteredInCanvas(canvas.width, newWidth);
  return {
    x: xCentered,
    y: 0,
    width: newWidth,
    height: canvas.height,
  };
}

// stretch the image width to fit the canvas
// keep the image aspect ratio, and center the image vertically
function CanvasDrawImageCoordsStretchImageToCanvasWidth({
  canvas,
  img,
}: CanvasDrawImageCoordsMinimalProps): ImageCoords {
  // Calculate the aspect ratio of the image.
  const aspectRatio = img.width / img.height;

  // Calculate the new height of the image based on the canvas width and image aspect ratio.
  const newHeight = canvas.width / aspectRatio;

  const yCentered = ImageSideCenteredInCanvas(canvas.height, newHeight);
  return {
    x: 0,
    y: yCentered,
    width: canvas.width,
    height: newHeight,
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
      return CanvasDrawImageCoordsStretched({ canvas, img });
    case 'stretch-height':
      return CanvasDrawImageCoordsStretchImageToCanvasHeight({ canvas, img });
    case 'stretch-width':
      return CanvasDrawImageCoordsStretchImageToCanvasWidth({ canvas, img });
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
    style: 'stretch-width',
  });

  CanvasDrawImageToContext({ ctx, img, coords });
};
