/**
 * It will convert a string into snake case
 * @param str in camel or pascal case
 * @example myString => my_string
 */
export const stringToSnakeCase = (str: string): string => {
  return str
    .split('')
    .map((letter, index) => {
      return letter.toUpperCase() === letter ? `${index !== 0 ? '_' : ''}${letter.toLowerCase()}` : letter;
    })
    .join('');
};
