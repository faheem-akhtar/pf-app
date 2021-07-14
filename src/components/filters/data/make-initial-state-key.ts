import { Opaque } from 'helpers/types';

import { FiltersParametersEnum } from '../../../enums/filters/parameters.enum';
import { FiltersValueBaseInterface } from '../value/base-interface';

export type FiltersDataChoicesKey = Opaque<'ChoicesKey', string>;

export const filtersDataMakeInitialStateKey = ({
  [FiltersParametersEnum.categoryId]: categoryId,
  [FiltersParametersEnum.propertyTypeId]: propertyTypeId,
}: FiltersValueBaseInterface): FiltersDataChoicesKey => {
  let key: string = categoryId;
  if (propertyTypeId) {
    key += `-${propertyTypeId}`;
  }

  return key as FiltersDataChoicesKey;
};
