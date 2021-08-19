/**
 * Parse the string to integer
 * For NaN return undefined
 * @param input - string to transform
 */
export const stringToNumber = (input: string): number | undefined => {
  const num = parseInt(input, 10);

  return isNaN(num) ? undefined : num;
};
