import { locationCompactJltStub, locationCompactKcStub } from 'stubs/location';

import { FiltersValueFieldAmenitiesType } from 'components/filters/value/field/amenities.type';
import { FiltersValueFieldBathroomsType } from 'components/filters/value/field/bathrooms.type';
import { FiltersValueFieldBedroomsType } from 'components/filters/value/field/bedrooms.type';
import { FiltersValueFieldCompletionStatusType } from 'components/filters/value/field/completion-status.type';
import { FiltersValueFieldFurnishedType } from 'components/filters/value/field/furnished.type';
import { FiltersValueFieldPaymentMethodType } from 'components/filters/value/field/payment-method.type';
import { FiltersValueFieldPricePeriodType } from 'components/filters/value/field/price-period.type';
import { FiltersValueFieldPropertyTypeIdType } from 'components/filters/value/field/property-type-id.type';
import { FiltersValueFieldSortType } from 'components/filters/value/field/sort.type';
import { FiltersValueFieldUtilitiesPriceTypeType } from 'components/filters/value/field/utilities-price-type.type';
import { FiltersValueFieldVirtualViewingType } from 'components/filters/value/field/virtual-viewing.type';
import { FiltersValueInterface } from 'components/filters/value/interface';
import { FiltersCategoryIdEnum } from 'enums/filters/category-id.enum';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';

export const filtersValueAllSetStub = (): FiltersValueInterface => ({
  [FiltersParametersEnum.locationsIds]: [locationCompactKcStub, locationCompactJltStub],
  [FiltersParametersEnum.categoryId]: FiltersCategoryIdEnum.residentialForSale,
  [FiltersParametersEnum.propertyTypeId]: '2' as FiltersValueFieldPropertyTypeIdType,
  [FiltersParametersEnum.minPrice]: 5000,
  [FiltersParametersEnum.maxPrice]: 50000,
  [FiltersParametersEnum.furnishing]: 'furnished' as FiltersValueFieldFurnishedType,
  [FiltersParametersEnum.minArea]: 500,
  [FiltersParametersEnum.maxArea]: 700,
  [FiltersParametersEnum.pricePeriod]: 'y' as FiltersValueFieldPricePeriodType,
  [FiltersParametersEnum.keyword]: 'beach,pool',
  [FiltersParametersEnum.amenities]: ['BB' as FiltersValueFieldAmenitiesType, 'RR' as FiltersValueFieldAmenitiesType],
  [FiltersParametersEnum.bedrooms]: ['1' as FiltersValueFieldBedroomsType, '2' as FiltersValueFieldBedroomsType],
  [FiltersParametersEnum.bathrooms]: ['1' as FiltersValueFieldBathroomsType, '3' as FiltersValueFieldBathroomsType],
  [FiltersParametersEnum.completionStatus]: 'completed' as FiltersValueFieldCompletionStatusType,
  [FiltersParametersEnum.paymentMethod]: 'cash' as FiltersValueFieldPaymentMethodType,
  [FiltersParametersEnum.utilitiesPriceType]: 'included' as FiltersValueFieldUtilitiesPriceTypeType,
  [FiltersParametersEnum.virtualViewings]: '360' as FiltersValueFieldVirtualViewingType,
  [FiltersParametersEnum.isDeveloperProperty]: true,
  [FiltersParametersEnum.minInstallmentYears]: 5,
  [FiltersParametersEnum.maxInstallmentYears]: 10,
  [FiltersParametersEnum.sort]: 'mr' as FiltersValueFieldSortType,
  [FiltersParametersEnum.pageNumber]: 3,
});
