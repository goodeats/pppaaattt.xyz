import {
  adjustColorBrightness,
  areColorsSimilar,
  isValidHex,
} from './color-utils';

// Determines if two colors match based on exact match, similarity, or brightness.

type colorIsMatchingProps = {
  pixelColor: string; // The base color to compare
  pixelColorMatch: string; // The color to compare against the base color
  matchSimilarity?: number; // The threshold for color similarity (0-1)
  matchBrightness?: number; // The threshold for brightness adjustment (0-1)
};

export const colorIsMatching = ({
  pixelColor,
  pixelColorMatch,
  matchSimilarity,
  matchBrightness,
}: colorIsMatchingProps): boolean => {
  // Validate input parameters
  if (!isValidHex(pixelColor) || !isValidHex(pixelColorMatch)) {
    throw new Error('Invalid color input');
  }

  return (
    isExactMatch(pixelColor, pixelColorMatch) ||
    isSimilarMatch(pixelColor, pixelColorMatch, matchSimilarity) ||
    isBrightnessMatch(pixelColor, pixelColorMatch, matchBrightness)
  );
};

const isExactMatch = (color1: string, color2: string) => color1 === color2;

const isSimilarMatch = (
  color1: string,
  color2: string,
  similarityThreshold: number | undefined
) => {
  if (typeof similarityThreshold !== 'number') return false;
  return areColorsSimilar(color1, color2, similarityThreshold);
};

const isBrightnessMatch = (
  color1: string,
  color2: string,
  brightnessThreshold: number | undefined
) => {
  if (typeof brightnessThreshold !== 'number') return false;
  return adjustColorBrightness(color1, brightnessThreshold) === color2;
};
