import { FiltersCategoryIdEnum } from 'enums/filters/category-id.enum';

// TODO-FE[TPNX-1880] Move this to the backend
export const keywordsByCategory: Record<FiltersCategoryIdEnum, string[]> = {
  [FiltersCategoryIdEnum.residentialForRent]: [],
  [FiltersCategoryIdEnum.residentialForSale]: [],
  [FiltersCategoryIdEnum.commercialForRent]: [],
  [FiltersCategoryIdEnum.commercialForSale]: [],
};
