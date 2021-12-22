import { stringToNumber } from 'helpers/string/to-number';

/**
 * Attached or replace the page query with the next page number
 */
export const propertySerpPreviousPageUrl = (pathUrl: string): string | undefined => {
  const regExp = /\bpage=(\d+)/;
  const match = pathUrl.match(regExp);
  const currentPage: number = stringToNumber(match?.[1] as string) || 1;
  const targetPage = currentPage - 1;

  if (currentPage <= 1) {
    return;
  }

  return match
    ? pathUrl.replace(regExp, `page=${targetPage}`)
    : `${pathUrl}${pathUrl.indexOf('?') >= 0 ? '&' : '?'}page=${targetPage}`;
};
