import { FiltersParametersEnum } from 'enums/filters/parameters.enum';

import { FiltersValueBaseInterface } from '../value/base-interface';
import { FiltersDataChoicesKeyType } from './choices/key.type';

// TODO-FE[CX-411] Add tests
export const filtersDataMakeInitialStateKey = ({
  [FiltersParametersEnum.categoryId]: categoryId,
  [FiltersParametersEnum.propertyTypeId]: propertyTypeId,
}: FiltersValueBaseInterface): FiltersDataChoicesKeyType => {
  let key: string = categoryId;
  if (propertyTypeId) {
    key += `-${propertyTypeId}`;
  }

  return key as FiltersDataChoicesKeyType;
};
