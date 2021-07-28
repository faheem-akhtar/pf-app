import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldCategoryIdType } from './field/category-id.type';
import { FiltersValueFieldPropertyTypeIdType } from './field/property-type-id.type';

export interface FiltersValueBaseInterface {
  /**
   * Category id
   */
  [FiltersParametersEnum.categoryId]: FiltersValueFieldCategoryIdType;

  /**
   * Property type id
   */
  [FiltersParametersEnum.propertyTypeId]: FiltersValueFieldPropertyTypeIdType | '';
}
