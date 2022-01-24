import { FiltersValueFieldPricePeriodType } from 'components/filters/value/field/price-period.type';
import { FiltersValueFieldSortType } from 'components/filters/value/field/sort.type';
import { FiltersValueInterface } from 'components/filters/value/interface';
import { FiltersCategoryIdEnum } from 'enums/filters/category-id.enum';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { PropertyPriceTypeShortEnum } from 'enums/property/price-type-short.enum';

export const filtersValueStub = (values: Partial<FiltersValueInterface> = {}): FiltersValueInterface => ({
  [FiltersParametersEnum.amenities]: [],
  [FiltersParametersEnum.locationsIds]: [],
  [FiltersParametersEnum.furnishing]: '',
  [FiltersParametersEnum.pricePeriod]: PropertyPriceTypeShortEnum.yearly as FiltersValueFieldPricePeriodType,
  [FiltersParametersEnum.categoryId]: FiltersCategoryIdEnum.residentialForRent,
  [FiltersParametersEnum.sort]: 'mr' as FiltersValueFieldSortType,
  [FiltersParametersEnum.propertyTypeId]: '',
  [FiltersParametersEnum.minPrice]: null,
  [FiltersParametersEnum.maxPrice]: null,
  [FiltersParametersEnum.minArea]: null,
  [FiltersParametersEnum.maxArea]: null,
  [FiltersParametersEnum.keyword]: '',
  [FiltersParametersEnum.completionStatus]: '',
  [FiltersParametersEnum.paymentMethod]: '',
  [FiltersParametersEnum.bedrooms]: [],
  [FiltersParametersEnum.bathrooms]: [],
  [FiltersParametersEnum.utilitiesPriceType]: '',
  [FiltersParametersEnum.virtualViewings]: '',
  [FiltersParametersEnum.isDeveloperProperty]: false,
  [FiltersParametersEnum.minInstallmentYears]: null,
  [FiltersParametersEnum.maxInstallmentYears]: null,
  [FiltersParametersEnum.pageNumber]: 1,
  ...values,
});
