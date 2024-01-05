import { randomInRange } from './random-utils';

// Math.PI / 1 = 180 degrees
export const RotateCompass = () => {
  return [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75];
};

export const RotateRandom = () => randomInRange(0, 2);
