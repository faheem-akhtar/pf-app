import { FiltersCategoryIdEnum } from 'enums/filters/category-id.enum';

import { categoryIdIsRent } from 'helpers/category-id/is-rent';

describe('categoryIdIsRent', () => {
  it('should return true for rent ids', () => {
    expect(categoryIdIsRent(FiltersCategoryIdEnum.commercialForRent)).toBeTruthy();
    expect(categoryIdIsRent(FiltersCategoryIdEnum.residentialForRent)).toBeTruthy();
  });

  it('should return false for sale ids', () => {
    expect(categoryIdIsRent(FiltersCategoryIdEnum.commercialForSale)).toBeFalsy();
    expect(categoryIdIsRent(FiltersCategoryIdEnum.residentialForSale)).toBeFalsy();
  });
});
