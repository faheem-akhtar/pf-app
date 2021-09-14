/**
 * Removes char with the given index
 *
 * @param value string to remove paranthesis and it content
 */
export const stringRemoveParentheses = (value: string): string => {
  return value.replace(/ *\([^)]*\) */g, '');
};
