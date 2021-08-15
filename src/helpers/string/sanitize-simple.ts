/**
 * Prevents script injection into the string. Used together with dangerouslySetHtml
 *
 * @param string - string to format with substitutions.
 */
export function stringSanitizeSimple(str: string): string {
  return encodeURIComponent(str).split('%20').join(' ');
}
