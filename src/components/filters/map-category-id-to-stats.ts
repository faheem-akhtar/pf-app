import { FiltersCategoryIdEnum } from 'enums/filters/category-id.enum';

export const filtersMapCategoryIdToStats = {
  [FiltersCategoryIdEnum.commercialForRent]: 'commercial_rent',
  [FiltersCategoryIdEnum.commercialForSale]: 'commercial_buy',
  [FiltersCategoryIdEnum.residentialForRent]: 'rent',
  [FiltersCategoryIdEnum.residentialForSale]: 'buy',
};
