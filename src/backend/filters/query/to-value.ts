import filtersDataByLocale from 'public/static/filters-data';

import { backendFiltersValueDefault } from 'backend/filters/value/default';
import { filtersDataGetInitialState } from 'components/filters/data/get-initial-state';
import { FiltersDataInterface } from 'components/filters/data/interface';
import { FiltersQueryInterface } from 'components/filters/query/interface';
import { FiltersValueFieldCategoryIdType } from 'components/filters/value/field/category-id.type';
import { FiltersValueInterface } from 'components/filters/value/interface';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersQueryParametersEnum } from 'enums/filters/query-parameters.enum';
import { arrayFilterNonValue } from 'helpers/array/filter/non-value';
import { categoryIdIsRent } from 'helpers/category-id/is-rent';
import { locationsMapByLocale } from 'helpers/locations/map-by-locale';
import { objectReduce } from 'helpers/object/reduce';

/**
 * Transforms query params to filters value
 * @example { c: 2, bf: 4, bt: 4 } => { filter[category_id] : '2', filter[min_bedroom]: '4', filter[max_bedroom]: '4' }
 */
export const backendFiltersQueryToValue = (
  queryParams: FiltersQueryInterface,
  locale: string
): FiltersValueInterface => {
  const categoryId = (queryParams[FiltersQueryParametersEnum.categoryId] ||
    backendFiltersValueDefault[FiltersParametersEnum.categoryId]) as FiltersValueFieldCategoryIdType;

  const defaultPricePeriod = categoryIdIsRent(categoryId)
    ? backendFiltersValueDefault[FiltersParametersEnum.pricePeriod]
    : '';

  const values = {
    [FiltersParametersEnum.locationsIds]: arrayFilterNonValue(
      queryParams[FiltersQueryParametersEnum.locationsIds]?.split('-')?.map((id) => locationsMapByLocale(locale)[id]) ||
        []
    ),
    [FiltersParametersEnum.categoryId]: categoryId,
    [FiltersParametersEnum.propertyTypeId]: queryParams[FiltersQueryParametersEnum.propertyTypeId] || '',
    [FiltersParametersEnum.minBedroom]: queryParams[FiltersQueryParametersEnum.minBedroom] || '',
    [FiltersParametersEnum.maxBedroom]: queryParams[FiltersQueryParametersEnum.maxBedroom] || '',
    [FiltersParametersEnum.minBathroom]: queryParams[FiltersQueryParametersEnum.minBathroom] || '',
    [FiltersParametersEnum.maxBathroom]: queryParams[FiltersQueryParametersEnum.maxBathroom] || '',
    [FiltersParametersEnum.minPrice]: queryParams[FiltersQueryParametersEnum.minPrice]
      ? parseInt(queryParams[FiltersQueryParametersEnum.minPrice] as string, 10)
      : null,
    [FiltersParametersEnum.maxPrice]: queryParams[FiltersQueryParametersEnum.maxPrice]
      ? parseInt(queryParams[FiltersQueryParametersEnum.maxPrice] as string, 10)
      : null,
    [FiltersParametersEnum.furnishing]:
      queryParams[FiltersQueryParametersEnum.furnishing] ||
      backendFiltersValueDefault[FiltersParametersEnum.furnishing],
    [FiltersParametersEnum.minArea]: queryParams[FiltersQueryParametersEnum.minArea]
      ? parseInt(queryParams[FiltersQueryParametersEnum.minArea] as string, 10)
      : null,
    [FiltersParametersEnum.maxArea]: queryParams[FiltersQueryParametersEnum.maxArea]
      ? parseInt(queryParams[FiltersQueryParametersEnum.maxArea] as string, 10)
      : null,
    [FiltersParametersEnum.pricePeriod]: queryParams[FiltersQueryParametersEnum.pricePeriod] || defaultPricePeriod,
    [FiltersParametersEnum.keyword]: queryParams[FiltersQueryParametersEnum.keyword] || '',
    [FiltersParametersEnum.amenities]: queryParams[FiltersQueryParametersEnum.amenities] || [],
    [FiltersParametersEnum.completionStatus]: queryParams[FiltersQueryParametersEnum.completionStatus] || '',
    [FiltersParametersEnum.paymentMethod]: queryParams[FiltersQueryParametersEnum.paymentMethod] || '',
    [FiltersParametersEnum.utilitiesPriceType]: queryParams[FiltersQueryParametersEnum.utilitiesPriceType] || '',
    [FiltersParametersEnum.virtualViewings]: queryParams[FiltersQueryParametersEnum.virtualViewings] || '',
    [FiltersParametersEnum.isDeveloperProperty]: queryParams[FiltersQueryParametersEnum.isDeveloperProperty] === '1',
    [FiltersParametersEnum.minInstallmentYears]: queryParams[FiltersQueryParametersEnum.minInstallmentYears]
      ? parseInt(queryParams[FiltersQueryParametersEnum.minInstallmentYears] as string, 10)
      : null,
    [FiltersParametersEnum.maxInstallmentYears]: queryParams[FiltersQueryParametersEnum.maxInstallmentYears]
      ? parseInt(queryParams[FiltersQueryParametersEnum.maxInstallmentYears] as string, 10)
      : null,
    [FiltersParametersEnum.sort]: queryParams[FiltersQueryParametersEnum.sort] || 'mr',
    [FiltersParametersEnum.pageNumber]: parseInt(queryParams[FiltersQueryParametersEnum.pageNumber] || '1', 10),
  } as FiltersValueInterface;

  const filtersData = (filtersDataByLocale as unknown as Record<string, FiltersDataInterface>)[locale];
  const availableQueryParamsByCategory = filtersDataGetInitialState(
    {
      [FiltersParametersEnum.categoryId]: categoryId,
      [FiltersParametersEnum.propertyTypeId]: '',
    },
    filtersData
  );

  return objectReduce(values, (acc, key, val) => ({
    ...acc,
    ...(Object.keys(availableQueryParamsByCategory).includes(key) && { [key]: val }),
  }));
};
