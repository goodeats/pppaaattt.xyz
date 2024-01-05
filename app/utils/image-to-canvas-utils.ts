import { BuildDimensions } from '~/lib/utils/build-structure/build-attributes';

type CanvasGetImageCoordsProps = {
  dimensions: BuildDimensions;
  img: HTMLImageElement;
  layout: 'centered' | 'stretched' | 'stretch-height' | 'stretch-width';
};

type ImageToCanvasMinimalProps = {
  dimensions: BuildDimensions;
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
function ImageToCanvasCentered({
  dimensions,
  img,
}: ImageToCanvasMinimalProps): ImageCoords {
  const { width, height } = dimensions;
  const xCentered = ImageSideCenteredInCanvas(width, img.width);
  const yCentered = ImageSideCenteredInCanvas(height, img.height);

  return {
    x: xCentered,
    y: yCentered,
    width: img.width,
    height: img.height,
  };
}

// stretch the image width and height to fit the canvas
function ImageToCanvasStretched({
  dimensions,
}: ImageToCanvasMinimalProps): ImageCoords {
  const { width, height } = dimensions;
  return {
    x: 0,
    y: 0,
    width: width,
    height: height,
  };
}

// stretch the image height to fit the canvas
// keep the image aspect ratio, and center the image horizontally
function ImageToCanvasStretchHeight({
  dimensions,
  img,
}: ImageToCanvasMinimalProps): ImageCoords {
  const { width, height } = dimensions;
  // Calculate the aspect ratio of the image.
  const aspectRatio = img.width / img.height;

  // Calculate the new width of the image based on the canvas height and image aspect ratio.
  const newWidth = height * aspectRatio;

  const xCentered = ImageSideCenteredInCanvas(width, newWidth);
  return {
    x: xCentered,
    y: 0,
    width: newWidth,
    height: height,
  };
}

// stretch the image width to fit the canvas
// keep the image aspect ratio, and center the image vertically
function ImageToCanvasStretchWidth({
  dimensions,
  img,
}: ImageToCanvasMinimalProps): ImageCoords {
  const { width, height } = dimensions;

  // Calculate the aspect ratio of the image.
  const aspectRatio = img.width / img.height;

  // Calculate the new height of the image based on the canvas width and image aspect ratio.
  const newHeight = width / aspectRatio;

  const yCentered = ImageSideCenteredInCanvas(height, newHeight);
  return {
    x: 0,
    y: yCentered,
    width: width,
    height: newHeight,
  };
}

export function ImageToCanvasDimensions({
  dimensions,
  img,
  layout,
}: CanvasGetImageCoordsProps): ImageCoords {
  switch (layout) {
    case 'centered':
      return ImageToCanvasCentered({ dimensions, img });
    case 'stretched':
      return ImageToCanvasStretched({ dimensions, img });
    case 'stretch-height':
      return ImageToCanvasStretchHeight({ dimensions, img });
    case 'stretch-width':
      return ImageToCanvasStretchWidth({ dimensions, img });
    default:
      return ImageToCanvasStretched({ dimensions, img });
  }
}
