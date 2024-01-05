import { BuildDimensions } from '~/lib/utils/build-structure/build-attributes';
import {
  ImageToCanvasDimensions,
  ImageCoords,
} from '~/utils/image-to-canvas-utils';
import { ImageLoad } from '~/utils/image-utils';

type CanvasDrawImageCoordsProps = {
  ctx: CanvasRenderingContext2D;
  img: HTMLImageElement;
  imageDimensions: ImageCoords;
};

// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
export async function CanvasDrawImageToContext({
  ctx,
  img,
  imageDimensions,
}: CanvasDrawImageCoordsProps) {
  const { x, y, width, height } = imageDimensions;
  ctx.drawImage(img, x, y, width, height);
}

type CanvasDrawProps = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  dimensions: BuildDimensions;
};

export const CanvasDrawImage = async ({ ctx, dimensions }: CanvasDrawProps) => {
  const imageSrc = 'http://localhost:5173/images/lob.jpg';
  const img = await ImageLoad({ imageSrc });

  // Get coordinates for image by layout style
  const imageDimensions = ImageToCanvasDimensions({
    dimensions,
    img,
    layout: 'stretch-height',
  });

  CanvasDrawImageToContext({ ctx, img, imageDimensions });
};
