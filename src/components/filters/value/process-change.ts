import { FiltersParametersEnum } from 'enums/filters/parameters.enum';

import { FiltersDataInterface } from '../data/interface';
import { filtersValueGetInitialStateForCategory } from './get-initial-state-for-category';
import { FiltersValueInterface } from './interface';

/**
 * Returns new filters if the category is not changed
 * otherwise updates the filters with initial values
 *
 * @param {FiltersDataInterface} filtersData
 * @param {FiltersValueInterface} prevFiltersValue
 * @param {FiltersValueInterface} newFiltersValue
 */
export const filtersValueProcessChange = (
  filtersData: FiltersDataInterface,
  prevFiltersValue: FiltersValueInterface,
  newFiltersValue: FiltersValueInterface
): FiltersValueInterface => {
  // If category changed - reset other filters except location
  if (prevFiltersValue[FiltersParametersEnum.categoryId] !== newFiltersValue[FiltersParametersEnum.categoryId]) {
    return filtersValueGetInitialStateForCategory(filtersData, newFiltersValue);
  }

  return newFiltersValue;
};
