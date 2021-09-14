import { FiltersValueFieldPricePeriodType } from 'components/filters/value/field/price-period.type';
import { FiltersValueFieldSortType } from 'components/filters/value/field/sort.type';
import { FiltersValueInterface } from 'components/filters/value/interface';
import { FiltersCategoryIdEnum } from 'enums/filters/category-id.enum';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';

export const filtersValueStub = (): FiltersValueInterface => ({
  [FiltersParametersEnum.locationsIds]: [],
  [FiltersParametersEnum.categoryId]: FiltersCategoryIdEnum.residentialForRent,
  [FiltersParametersEnum.propertyTypeId]: '',
  [FiltersParametersEnum.minBedroom]: '',
  [FiltersParametersEnum.maxBedroom]: '',
  [FiltersParametersEnum.minBathroom]: '',
  [FiltersParametersEnum.maxBathroom]: '',
  [FiltersParametersEnum.minPrice]: null,
  [FiltersParametersEnum.maxPrice]: null,
  [FiltersParametersEnum.furnishing]: '',
  [FiltersParametersEnum.minArea]: null,
  [FiltersParametersEnum.maxArea]: null,
  [FiltersParametersEnum.pricePeriod]: 'y' as FiltersValueFieldPricePeriodType,
  [FiltersParametersEnum.keyword]: '',
  [FiltersParametersEnum.amenities]: [],
  [FiltersParametersEnum.completionStatus]: '',
  [FiltersParametersEnum.paymentMethod]: '',
  [FiltersParametersEnum.utilitiesPriceType]: '',
  [FiltersParametersEnum.virtualViewings]: '',
  [FiltersParametersEnum.isDeveloperProperty]: false,
  [FiltersParametersEnum.minInstallmentYears]: null,
  [FiltersParametersEnum.maxInstallmentYears]: null,
  [FiltersParametersEnum.sort]: 'mr' as FiltersValueFieldSortType,
  [FiltersParametersEnum.pageNumber]: 1,
});
