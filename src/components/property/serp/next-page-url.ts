import { stringToNumber } from 'helpers/string/to-number';

/**
 * Attached or replace the page query with the previous page number
 */
export const propertySerpNextPageUrl = (pathUrl: string, totalPages: number): string | undefined => {
  const regExp = /\bpage=(\d+)/;
  const match = pathUrl.match(regExp);
  const currentPage: number = stringToNumber(match?.[1] as string) || 1;
  const targetPage = currentPage + 1;

  if (currentPage >= totalPages) {
    return;
  }

  return match
    ? pathUrl.replace(regExp, `page=${targetPage}`)
    : `${pathUrl}${pathUrl.indexOf('?') >= 0 ? '&' : '?'}page=${targetPage}`;
};
