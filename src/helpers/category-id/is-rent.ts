import { FiltersCategoryIdEnum } from 'enums/filters/category-id.enum';

/**
 * Check if property category id is rent
 * @param categoryId
 */
export const categoryIdIsRent = (categoryId: FiltersCategoryIdEnum): boolean =>
  categoryId === FiltersCategoryIdEnum.commercialForRent || categoryId === FiltersCategoryIdEnum.residentialForRent;
