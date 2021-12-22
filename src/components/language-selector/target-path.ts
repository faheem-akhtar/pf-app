import { backendFiltersQueryParamTranslate } from 'backend/filters/query/param-translate';
import { FiltersQueryParamEnum } from 'components/filters/query/param.enum';
import { objectReduce } from 'helpers/object/reduce';

/**
 * Translate the path into the targetLocale based on pattern
 * @example /buy/apartments-for-sale.html => /للبيع/شقق-للبيع.html
 */
export const languageSelectorTargetPath = (
  pattern: string,
  path: string,
  currentLocale: string,
  targetLocale: string
): string => {
  // All possible groups
  const groups = Object.values(FiltersQueryParamEnum);

  const query = path.match(/\?.+$/)?.[0] || '';

  const nammedPattern = pattern
    .replace(/categorySlug/, 'categorySlug([%a-zA-Z0-9+_-]+)')
    .replace(/citySlug/, 'citySlug([%a-zA-Z0-9+_-]+)')
    .replace(/locationSlug/, 'locationSlug([%a-zA-Z0-9+_-]+)')
    .replace(/propertyTypeSlug/, 'propertyTypeSlug([%a-zA-Z0-9+_-]+)')
    .replace(/furnishSlug/, `furnishSlug(furnished|${encodeURI('مفروشة')})`)
    .replace(/bedroomSlug/, `bedroomSlug([1-7]-bedroom|studio|${encodeURI('استوديو')}|[1-7]-${encodeURI('غرفة-نوم')})`)
    .replace(/priceType/, `priceType(monthly|${encodeURI('شهري')})`)
    .replace(
      /saleType/,
      `saleType(for-rent|for-sale|${encodeURI('للايجار')}|${encodeURI('للإجار')}|${encodeURI('للبيع')})`
    );

  const strRegExp = pattern
    .replace(/categorySlug/, '([%a-zA-Z0-9+_-]+)')
    .replace(/citySlug/, '([%a-zA-Z0-9+_-]+)')
    .replace(/locationSlug/, '([%a-zA-Z0-9+_-]+)')
    .replace(/propertyTypeSlug/, '([%a-zA-Z0-9+_-]+)')
    .replace(/furnishSlug/, `(furnished|${encodeURI('مفروشة')})`)
    .replace(/bedroomSlug/, `([1-7]-bedroom|studio|${encodeURI('استوديو')}|[1-7]-${encodeURI('غرفة-نوم')})`)
    .replace(/priceType/, `(monthly|${encodeURI('شهري')})`)
    .replace(/saleType/, `(for-rent|for-sale|${encodeURI('للايجار')}|${encodeURI('للإجار')}|${encodeURI('للبيع')})`);

  const patternRegExp = new RegExp(strRegExp, 'mg');
  const matches = patternRegExp.exec(encodeURI(path));

  if (!matches) {
    return path;
  }

  const values = nammedPattern
    .split(/[^a-zA-Z]+/)
    .filter((item) => groups.includes(item as FiltersQueryParamEnum))
    .reduce((acc, item, index) => {
      acc[item] = decodeURI(matches[index + 1]);
      return acc;
    }, {} as Record<string, string>);

  const targetValues = backendFiltersQueryParamTranslate(values, currentLocale, targetLocale);

  return `${objectReduce(
    targetValues,
    (acc, key, val) => acc.replace(new RegExp(`(${key}\\(.+?\\))`), val),
    nammedPattern
  )}${query}`;
};
