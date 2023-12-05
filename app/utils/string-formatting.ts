export const formatNumberArrayToString = (
  numbers: number[],
  units: string = '',
  separator: string = ', '
): string => {
  return numbers.map((num: number) => `${num}${units}`).join(separator);
};

export const formatRangeToString = (
  range: number[],
  units: string = ''
): string => {
  return formatNumberArrayToString(range, units, ' - ');
};

export const formatTimeStampsReadable = (timestamp: string): string => {
  return new Date(timestamp).toLocaleString();
};
