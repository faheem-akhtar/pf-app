import { FiltersCategoryIdEnum } from 'enums/filters/category-id.enum';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldCategoryIdType } from 'components/filters/value/field/category-id.type';
import { FiltersValueFieldFurnishedType } from 'components/filters/value/field/furnished.type';
import { FiltersValueFieldPricePeriodType } from 'components/filters/value/field/price-period.type';
import { FiltersValueInterface } from 'components/filters/value/interface';
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
  [FiltersParametersEnum.minBedroom]: '',
  [FiltersParametersEnum.maxBedroom]: '',
  [FiltersParametersEnum.minBathroom]: '',
  [FiltersParametersEnum.maxBathroom]: '',
  [FiltersParametersEnum.minPrice]: null,
  [FiltersParametersEnum.maxPrice]: null,
  [FiltersParametersEnum.minArea]: '',
  [FiltersParametersEnum.maxArea]: '',
  [FiltersParametersEnum.keyword]: '',
  [FiltersParametersEnum.completionStatus]: '',
  [FiltersParametersEnum.paymentMethod]: '',
  [FiltersParametersEnum.utilitiesPriceType]: '',
  [FiltersParametersEnum.virtualViewings]: '',
  [FiltersParametersEnum.pageNumber]: 1,
};
