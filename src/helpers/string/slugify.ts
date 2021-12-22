/**
 * Convert a string to uri slug
 */
export const stringSlugify = (str: string): string => {
  const notAllowedCharacters = new RegExp('&', 'g');
  return str
    .replace(/^\s+|\s+$/g, '')
    .replace(notAllowedCharacters, '')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};
