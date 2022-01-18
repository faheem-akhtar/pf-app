import { backendFiltersQueryParamTranslate } from 'backend/filters/query/param-translate';
import { FiltersQueryParamEnum } from 'components/filters/query/param.enum';
import { objectReduce } from 'helpers/object/reduce';

/**
 * Translate the path into the targetLocale based on pattern
 * @example /buy/apartments-for-sale.html => /للبيع/شقق-للبيع.html
 */
export const backendTranslationQueryToPath = (
  urlQuery: { [key: string]: string | string[] },
  currentLocale: string,
  targetLocale: string
): string | null => {
  // All possible groups
  const groups = Object.values(FiltersQueryParamEnum);

  let missMatch = false;

  const pattern = urlQuery.pattern as string;

  if (!pattern) {
    return null;
  }

  const decodedQuery = objectReduce(
    urlQuery,
    (acc, key, val) => {
      acc[key] = decodeURI(val as string);
      return acc;
    },
    {} as typeof urlQuery
  );

  const queryString: string = objectReduce(
    decodedQuery,
    (acc, key, val) => {
      if (!groups.includes(key as FiltersQueryParamEnum) && key !== 'pattern') {
        acc.push(`${key}=${val}`);
      }
      return acc;
    },
    [] as string[]
  ).join('&');

  const targetValues = backendFiltersQueryParamTranslate(decodedQuery, currentLocale, targetLocale);

  const targetPath = objectReduce(
    targetValues,
    (acc, key, val) => {
      const regex = new RegExp(key as string);
      if (acc.match(regex) === null) {
        missMatch = true;
      }
      return acc.replace(regex, val as string);
    },
    pattern
  );

  return missMatch ? null : `${targetPath}${queryString ? `?${queryString}` : ''}`;
};
