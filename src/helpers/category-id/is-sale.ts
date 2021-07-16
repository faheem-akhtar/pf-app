import { FiltersCategoryIdEnum } from 'enums/filters/category-id.enum';

/**
 * Check if property category id is sale
 * @param categoryId
 */
export const categoryIdIsSale = (categoryId: FiltersCategoryIdEnum): boolean =>
  categoryId === FiltersCategoryIdEnum.commercialForSale || categoryId === FiltersCategoryIdEnum.residentialForSale;
