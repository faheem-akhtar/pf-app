/**
 * It will convert a string into camel case
 * @param str in snake case case
 * @example my_string => myString
 */
export const stringToCamelCase = (str: string): string => {
  return str
    .split('_')
    .map((word, wordIndex) =>
      wordIndex === 0
        ? word
        : word
            .split('')
            .map((letter, letterIndex) => (letterIndex === 0 ? letter.toUpperCase() : letter.toLocaleLowerCase()))
            .join('')
    )
    .join('');
};
