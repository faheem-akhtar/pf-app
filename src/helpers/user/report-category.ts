import { categoryIdIsRent } from 'helpers/category-id/is-rent';
import { FiltersCategoryIdEnum } from 'enums/filters/category-id.enum';
import { PropertyReportUserTypeEnum } from 'enums/property/report-user-type.enum';

/**
 *
 * @param categoryId
 * @returns report parameter based on active category id
 */
export const userReportCategory = (categoryId: FiltersCategoryIdEnum): PropertyReportUserTypeEnum =>
  categoryIdIsRent(categoryId) ? PropertyReportUserTypeEnum.RENTER : PropertyReportUserTypeEnum.BUYER;
