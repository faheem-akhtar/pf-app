import { FiltersValueFieldCategoryIdType } from 'components/filters/value/field/category-id.type';
import { FiltersValueFieldFurnishedType } from 'components/filters/value/field/furnished.type';
import { FiltersValueFieldPricePeriodType } from 'components/filters/value/field/price-period.type';
import { FiltersValueInterface } from 'components/filters/value/interface';
import { FiltersCategoryIdEnum } from 'enums/filters/category-id.enum';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { PropertyPriceTypeShortEnum } from 'enums/property/price-type-short.enum';

export const backendFiltersValueDefaultBase: FiltersValueInterface = {
  [FiltersParametersEnum.amenities]: [],
  [FiltersParametersEnum.locationsIds]: [],
  // TODO-FE[TPNX-3049] investigate why it is 0 and not an empty string
  [FiltersParametersEnum.furnishing]: '0' as FiltersValueFieldFurnishedType,
  [FiltersParametersEnum.pricePeriod]: PropertyPriceTypeShortEnum.yearly as FiltersValueFieldPricePeriodType,
  [FiltersParametersEnum.categoryId]: FiltersCategoryIdEnum.residentialForRent as FiltersValueFieldCategoryIdType,
  [FiltersParametersEnum.sort]: '',
  [FiltersParametersEnum.query as string]: '',
  [FiltersParametersEnum.propertyTypeId]: '',
  [FiltersParametersEnum.bedrooms]: [],
  [FiltersParametersEnum.bathrooms]: [],
  [FiltersParametersEnum.minPrice]: null,
  [FiltersParametersEnum.maxPrice]: null,
  [FiltersParametersEnum.minArea]: null,
  [FiltersParametersEnum.maxArea]: null,
  [FiltersParametersEnum.keyword]: '',
  [FiltersParametersEnum.completionStatus]: '',
  [FiltersParametersEnum.paymentMethod]: '',
  [FiltersParametersEnum.utilitiesPriceType]: '',
  [FiltersParametersEnum.virtualViewings]: '',
  [FiltersParametersEnum.isDeveloperProperty]: false,
  [FiltersParametersEnum.minInstallmentYears]: null,
  [FiltersParametersEnum.maxInstallmentYears]: null,
  [FiltersParametersEnum.pageNumber]: 1,
};
