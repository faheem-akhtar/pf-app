import { FiltersDataChoicesKeyType } from './choices/key.type';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueBaseInterface } from '../value/base-interface';

export const filtersDataMakeChoicesIndexesKey = (
  {
    [FiltersParametersEnum.categoryId]: categoryId,
    [FiltersParametersEnum.propertyTypeId]: propertyTypeId,
  }: FiltersValueBaseInterface,
  filterType: FiltersParametersEnum
): FiltersDataChoicesKeyType => {
  let key: string = categoryId;
  if (propertyTypeId) {
    key += `-${propertyTypeId}`;
  }

  return `${key}-${filterType}` as FiltersDataChoicesKeyType;
};
