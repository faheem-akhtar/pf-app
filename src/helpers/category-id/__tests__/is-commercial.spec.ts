import { FiltersCategoryIdEnum } from 'enums/filters/category-id.enum';

import { categoryIdIsCommercial } from 'helpers/category-id/is-commercial';

describe('categoryIdIsCommercial', () => {
  it('should return true for commercial ids', () => {
    expect(categoryIdIsCommercial(FiltersCategoryIdEnum.commercialForRent)).toBeTruthy();
    expect(categoryIdIsCommercial(FiltersCategoryIdEnum.commercialForSale)).toBeTruthy();
  });

  it('should return false for non-commercial ids', () => {
    expect(categoryIdIsCommercial(FiltersCategoryIdEnum.residentialForRent)).toBeFalsy();
    expect(categoryIdIsCommercial(FiltersCategoryIdEnum.residentialForSale)).toBeFalsy();
  });
});
