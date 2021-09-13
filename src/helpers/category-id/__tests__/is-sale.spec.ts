import { FiltersCategoryIdEnum } from 'enums/filters/category-id.enum';

import { categoryIdIsSale } from 'helpers/category-id/is-sale';

describe('categoryIdIsSale', () => {
  it('should return true for sale ids', () => {
    expect(categoryIdIsSale(FiltersCategoryIdEnum.commercialForSale)).toBeTruthy();
    expect(categoryIdIsSale(FiltersCategoryIdEnum.residentialForSale)).toBeTruthy();
  });

  it('should return false for rent ids', () => {
    expect(categoryIdIsSale(FiltersCategoryIdEnum.commercialForRent)).toBeFalsy();
    expect(categoryIdIsSale(FiltersCategoryIdEnum.residentialForRent)).toBeFalsy();
  });
});
