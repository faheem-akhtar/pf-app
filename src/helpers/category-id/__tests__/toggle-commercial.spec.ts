import { FiltersCategoryIdEnum } from 'enums/filters/category-id.enum';
import { categoryIdToggleCommercial } from 'helpers/category-id/toggle-commercial';

describe('categoryIdToggleCommercial', () => {
  it('should return residential for sale when the commercial for sale', () => {
    expect(categoryIdToggleCommercial(FiltersCategoryIdEnum.commercialForSale)).toBe(
      FiltersCategoryIdEnum.residentialForSale
    );
  });

  it('should return commercial for sale when the residential for sale', () => {
    expect(categoryIdToggleCommercial(FiltersCategoryIdEnum.residentialForSale)).toBe(
      FiltersCategoryIdEnum.commercialForSale
    );
  });

  it('should return residential for rent when the commercial for rent', () => {
    expect(categoryIdToggleCommercial(FiltersCategoryIdEnum.commercialForRent)).toBe(
      FiltersCategoryIdEnum.residentialForRent
    );
  });

  it('should return commercial for rent when the residential for rent', () => {
    expect(categoryIdToggleCommercial(FiltersCategoryIdEnum.residentialForRent)).toBe(
      FiltersCategoryIdEnum.commercialForRent
    );
  });
});
