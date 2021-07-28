import { filtersDataMakeInitialStateKey } from './make-initial-state-key';

import { FiltersDataInterface } from './interface';
import { FiltersValueBaseInterface } from '../value/base-interface';
import { FiltersValueInterface } from '../value/interface';

/**
 * Returns initial state for given category and propertyTypeId
 * @param filtersData
 * @param categoryId Ex: '2'
 * @param propertyTypeId Ex: '17'
 *
 * Use cases:
 * - when we change the category, some values need to be reseted to initial state
 * - initial state also defines the filter types that available for current combination of categoryId/propertyTypeId
 */
export const filtersDataGetInitialState = (
  value: FiltersValueBaseInterface,
  filtersData: FiltersDataInterface
): FiltersValueInterface => {
  const key = filtersDataMakeInitialStateKey(value);
  return filtersData.initialState[key] as FiltersValueInterface;
};
