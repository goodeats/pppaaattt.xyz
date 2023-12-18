export function removeWhitespace(input: string): string {
  return input.replace(/\s/g, '');
}

export function validateCommaSeparatedStrings(input: string): boolean {
  const values = input.split(',');
  return values.every((value) => typeof value === 'string');
}

export function validateCommaSeparatedNumbers(input: string): boolean {
  const values = input.split(',');
  return values.every((value) => !isNaN(Number(value)));
}

export function validateMinMaxRange(input: number[]): boolean {
  return input[0] < input[1];
}

export function validateRangeHasTwoValues(input: number[]): boolean {
  return input.length === 2;
}

export function validateStringsAreHexcodes(input: string[]): boolean {
  return input.every((value) => /^#?[0-9A-Fa-f]{6}$/.test(value));
}
