import { FiltersParametersEnum } from '../../../enums/filters/parameters.enum';
import { FiltersValueFieldCategoryId } from './field/category-id';
import { FiltersValueFieldPropertyTypeId } from './field/property-type-id';

export interface FiltersValueBaseInterface {
  /**
   * Category id
   */
  [FiltersParametersEnum.categoryId]: FiltersValueFieldCategoryId;

  /**
   * Property type id
   */
  [FiltersParametersEnum.propertyTypeId]: FiltersValueFieldPropertyTypeId | '';
}
