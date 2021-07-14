import { FiltersCategoryIdEnum } from 'enums/filters/category-id.enum';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldCategoryId } from 'components/filters/value/field/category-id';
import { FiltersValueInterface } from 'components/filters/value/interface';
import { backendFiltersValueDefaultBase } from './base';

export const backendFiltersValueDefault: FiltersValueInterface = {
  ...backendFiltersValueDefaultBase,
  [FiltersParametersEnum.categoryId]: FiltersCategoryIdEnum.residentialForSale as FiltersValueFieldCategoryId,
};
