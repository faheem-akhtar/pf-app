import { stringEscape } from 'helpers/string/escape';

import { HighlightParamsInterface } from './params.interface';

const defaultParams: HighlightParamsInterface = {
  caseSensitive: false,
  wrapper: '<strong>$1</strong>',
};

/**
 * Highlights (wraps in params.wrapper) string
 *
 * @param stringToHighlight - string to highlight
 * @param originalString - original string
 * @param params - function configuration params
 */
export function highlightString(
  stringToHighlight: string,
  originalString: string,
  params?: HighlightParamsInterface
): string {
  // Extend default params with custom params
  params = {
    ...defaultParams,
    ...params,
  };

  // Clear all brackets from string
  const escapedString = stringEscape(stringToHighlight.replace(/\(|\)/g, ''));

  if (!escapedString) {
    return originalString;
  }

  return originalString
    .replace(new RegExp(`(${escapedString})`, params.caseSensitive ? 'gm' : 'igm'), params.wrapper || '')
    .replace(/\s/g, '&nbsp;');
}
