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

export const isValidImageUrl = (url: string): boolean => {
  // Regular expression for URL validation
  const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg|bmp))$/i;

  return urlPattern.test(url);
};
