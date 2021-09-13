import { FiltersCategoryIdEnum } from 'enums/filters/category-id.enum';

/**
 * Check if property category id is commercial
 *
 * @param categoryId
 */
export const categoryIdIsCommercial = (categoryId: FiltersCategoryIdEnum): boolean =>
  [FiltersCategoryIdEnum.commercialForRent, FiltersCategoryIdEnum.commercialForSale].indexOf(categoryId) !== -1;
