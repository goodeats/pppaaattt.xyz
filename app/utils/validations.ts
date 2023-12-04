export function removeWhitespace(input: string): string {
  return input.replace(/\s/g, '');
}

export function validateCommaSeparatedNumbers(input: string): boolean {
  const values = input.split(',');
  return values.every((value) => !isNaN(Number(value)));
}
