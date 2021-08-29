import { FiltersCategoryIdEnum } from './../../enums/filters/category-id.enum';

import { categoryIdIsCommercial } from './is-commercial';
import { categoryIdIsRent } from './is-rent';

/**
 * Replaces categoryId with the reversed corresponding value
 *
 * @param categoryId FiltersCategoryIdEnum
 */
export const categoryIdToggleCommercial = (categoryId: FiltersCategoryIdEnum): FiltersCategoryIdEnum => {
  if (categoryIdIsCommercial(categoryId)) {
    return categoryIdIsRent(categoryId)
      ? FiltersCategoryIdEnum.residentialForRent
      : FiltersCategoryIdEnum.residentialForSale;
  }

  return categoryIdIsRent(categoryId)
    ? FiltersCategoryIdEnum.commercialForRent
    : FiltersCategoryIdEnum.commercialForSale;
};
