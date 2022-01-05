import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { objectCompare } from 'helpers/object/compare';
import { objectFilterNonOrEmptyValue } from 'helpers/object/filter/non-or-empty-value';

import { FiltersValueInterface } from './interface';

/**
 * Check if filters values are same, ignoring sort, page and locations
 * @param {FiltersValueInterface} v1 First value
 * @param {FiltersValueInterface} v2 Second value
 * @param {Array<keyof FiltersValueInterface>} ignoreParameters optional array of parameters to ignore during comparison
 * @returns true if filteres are same
 */
export const filtersValueEquals = (
  v1: FiltersValueInterface,
  v2: FiltersValueInterface,
  ignoreParameters: Array<keyof FiltersValueInterface> = [
    FiltersParametersEnum.pageNumber,
    FiltersParametersEnum.sort,
    FiltersParametersEnum.locationsIds,
  ]
): boolean => {
  v1 = objectFilterNonOrEmptyValue({ ...v1 });
  v2 = objectFilterNonOrEmptyValue({ ...v2 });

  ignoreParameters.forEach((p) => {
    delete v1[p];
    delete v2[p];
  });

  return objectCompare(v1, v2);
};
