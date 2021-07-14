import { FiltersDataInterface } from './interface';
import { FiltersParametersEnum } from '../../../enums/filters/parameters.enum';
import { FiltersValueBaseInterface } from '../value/base-interface';
import { FiltersValueInterface } from '../value/interface';
import { filtersGetInitialState } from './get-initial-state';

/**
 * Get enabled filter types for given combination of categoryId/propertyTypeId
 */
export const filtersDataGetEnabledFilterTypes = (
  value: FiltersValueBaseInterface,
  filtersData: FiltersDataInterface
): Record<keyof FiltersValueInterface, true | void> => {
  return {
    [FiltersParametersEnum.categoryId]: true,
    ...Object.keys(filtersGetInitialState(value, filtersData)).reduce((a, k) => ({ ...a, [k]: true }), {}),
  } as Record<keyof FiltersValueInterface, true | void>;
};
