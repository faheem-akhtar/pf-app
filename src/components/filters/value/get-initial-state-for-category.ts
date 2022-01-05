import { FiltersParametersEnum } from 'enums/filters/parameters.enum';

import { filtersDataGetInitialState } from '../data/get-initial-state';
import { FiltersDataInterface } from '../data/interface';
import { FiltersValueInterface } from './interface';

/**
 * Returns initial values except category and location
 *
 * @param {FiltersDataInterface} filtersData
 * @param {FiltersValueInterface} state
 */
export const filtersValueGetInitialStateForCategory = (
  filtersData: FiltersDataInterface,
  state: FiltersValueInterface
): FiltersValueInterface => ({
  ...filtersDataGetInitialState(
    {
      [FiltersParametersEnum.categoryId]: state[FiltersParametersEnum.categoryId],
      [FiltersParametersEnum.propertyTypeId]: '',
    },
    filtersData
  ),
  [FiltersParametersEnum.locationsIds]: state[FiltersParametersEnum.locationsIds],
});
