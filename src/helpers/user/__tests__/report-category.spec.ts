import { FiltersCategoryIdEnum } from 'enums/filters/category-id.enum';
import { PropertyReportUserTypeEnum } from 'enums/property/report/user-type.enum';
import { userReportCategory } from '../report-category';

describe('userReportCategory()', () => {
  it('should return renter for rent-related categories', () => {
    const rentCategories = [FiltersCategoryIdEnum.commercialForRent, FiltersCategoryIdEnum.residentialForRent];
    const results = rentCategories.map(userReportCategory);
    results.every((result) => expect(result).toBe(PropertyReportUserTypeEnum.renter));
  });

  it('should return buyer for buy-related categories', () => {
    const rentCategories = [FiltersCategoryIdEnum.commercialForSale, FiltersCategoryIdEnum.residentialForSale];
    const results = rentCategories.map(userReportCategory);
    results.every((result) => expect(result).toBe(PropertyReportUserTypeEnum.buyer));
  });
});
