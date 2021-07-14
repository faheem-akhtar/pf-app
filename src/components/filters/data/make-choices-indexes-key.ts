import { Opaque } from 'helpers/types';

import { FiltersParametersEnum } from '../../../enums/filters/parameters.enum';
import { FiltersValueBaseInterface } from '../value/base-interface';

export type FiltersDataChoicesKey = Opaque<'ChoicesKey', string>;

export const filtersDataMakeChoicesIndexesKey = (
  {
    [FiltersParametersEnum.categoryId]: categoryId,
    [FiltersParametersEnum.propertyTypeId]: propertyTypeId,
  }: FiltersValueBaseInterface,
  filterType: FiltersParametersEnum
): FiltersDataChoicesKey => {
  let key: string = categoryId;
  if (propertyTypeId) {
    key += `-${propertyTypeId}`;
  }

  return `${key}-${filterType}` as FiltersDataChoicesKey;
};
