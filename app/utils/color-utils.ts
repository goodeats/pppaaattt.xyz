export const isValidHex = (hex: string): boolean => {
  return /^#?[0-9A-Fa-f]{6}$/.test(hex);
};

export const colorHexInvert = (hex: string): string => {
  // Remove the hash at the start if it's there
  hex = hex.replace('#', '');

  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Invert each component
  const rInv = (255 - r).toString(16).padStart(2, '0').toUpperCase();
  const gInv = (255 - g).toString(16).padStart(2, '0').toUpperCase();
  const bInv = (255 - b).toString(16).padStart(2, '0').toUpperCase();

  // Combine and return the inverted hex code
  return `#${rInv}${gInv}${bInv}`;
};

export const colorRandomHex = (): string => {
  let random = Math.floor(Math.random() * 16777215).toString(16);
  if (random.length === 5) {
    random = '0' + random;
  }
  return `#${random.toUpperCase()}`;
};

export const adjustColorBrightness = (
  hex: string,
  percentage: number
): string => {
  hex = hex.replace('#', '');

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const rAdj = Math.min(Math.max(Math.round(r * (1 + percentage)), 0), 255)
    .toString(16)
    .padStart(2, '0')
    .toUpperCase();
  const gAdj = Math.min(Math.max(Math.round(g * (1 + percentage)), 0), 255)
    .toString(16)
    .padStart(2, '0')
    .toUpperCase();
  const bAdj = Math.min(Math.max(Math.round(b * (1 + percentage)), 0), 255)
    .toString(16)
    .padStart(2, '0')
    .toUpperCase();

  return `#${rAdj}${gAdj}${bAdj}`;
};

export const areColorsSimilar = (
  hex1: string,
  hex2: string,
  sameness: number = 0.1
): boolean => {
  // Convert hex to RGB
  const r1 = parseInt(hex1.substring(1, 3), 16);
  const g1 = parseInt(hex1.substring(3, 5), 16);
  const b1 = parseInt(hex1.substring(5, 7), 16);

  const r2 = parseInt(hex2.substring(1, 3), 16);
  const g2 = parseInt(hex2.substring(3, 5), 16);
  const b2 = parseInt(hex2.substring(5, 7), 16);

  // Calculate the difference
  const diffR = Math.abs(r1 - r2) / 255;
  const diffG = Math.abs(g1 - g2) / 255;
  const diffB = Math.abs(b1 - b2) / 255;

  // Check if the colors are similar
  return diffR <= sameness && diffG <= sameness && diffB <= sameness;
};
