/**
 * Escapes string
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
 *
 * @param originalString - string to escape
 * @example stringEscape('<script>alert('hi');</script>') => %3Cscript%3Ealert%28%27hi%27%29%3B%3C/script%3E
 */
export function stringEscape(originalString: string): string {
  return originalString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
