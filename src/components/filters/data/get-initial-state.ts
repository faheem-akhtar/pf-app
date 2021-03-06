import { FiltersValueBaseInterface } from '../value/base-interface';
import { FiltersValueInterface } from '../value/interface';
import { FiltersDataInterface } from './interface';
import { filtersDataMakeInitialStateKey } from './make-initial-state-key';

// TODO-FE[CX-411] Add tests
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
  const initialState = filtersData.initialState[key] as FiltersValueInterface;

  if (!initialState) {
    // eslint-disable-next-line no-console
    console.error(`Invalid category to property pair: ${key}`);
  }

  return initialState;
};
