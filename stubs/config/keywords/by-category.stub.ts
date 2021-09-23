import { FiltersCategoryIdEnum } from 'enums/filters/category-id.enum';

export const configKeywordsByCategoryStub: Record<FiltersCategoryIdEnum, string[]> = {
  [FiltersCategoryIdEnum.residentialForRent]: ['lorem', 'ipsum'],
  [FiltersCategoryIdEnum.residentialForSale]: ['dolor', 'sit'],
  [FiltersCategoryIdEnum.commercialForRent]: ['aw', 'ac', 'as', 'ag', 'at', 'au', 'aq', 'az', 'ab'],
  [FiltersCategoryIdEnum.commercialForSale]: ['dolor', 'sit', 'amet'],
};
