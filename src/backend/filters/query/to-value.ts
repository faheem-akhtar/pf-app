import locationsByLocale from '../../../../public/static/locations';

import { backendFiltersValueDefault } from 'backend/filters/value/default';
import { categoryIdIsRent } from 'helpers/category-id/is-rent';
import { configPriceChoicesDefinition } from 'config/price-choices/definition';

import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersQueryInterface } from 'components/filters/query/interface';
import { FiltersQueryParametersEnum } from 'enums/filters/query-parameters.enum';
import { FiltersValueFieldAmenitiesType } from 'components/filters/value/field/amenities.type';
import { FiltersValueFieldCategoryIdType } from 'components/filters/value/field/category-id.type';
import { FiltersValueFieldCompletionStatusType } from 'components/filters/value/field/completion-status.type';
import { FiltersValueFieldFurnishedType } from 'components/filters/value/field/furnished.type';
import { FiltersValueFieldMaxBathroomType } from 'components/filters/value/field/max-bathroom.type';
import { FiltersValueFieldMaxBedroomType } from 'components/filters/value/field/max-bedroom.type';
import { FiltersValueFieldMinBathroomType } from 'components/filters/value/field/min-bathroom.type';
import { FiltersValueFieldMinBedroomType } from 'components/filters/value/field/min-bedroom.type';
import { FiltersValueFieldPaymentMethodType } from 'components/filters/value/field/payment-method.type';
import { FiltersValueFieldPricePeriodType } from 'components/filters/value/field/price-period.type';
import { FiltersValueFieldPropertyTypeIdType } from 'components/filters/value/field/property-type-id.type';
import { FiltersValueFieldSortType } from 'components/filters/value/field/sort.type';
import { FiltersValueFieldUtilitiesPriceTypeType } from 'components/filters/value/field/utilities-price-type.type';
import { FiltersValueFieldVirtualViewingType } from 'components/filters/value/field/virtual-viewing.type';
import { FiltersValueInterface } from 'components/filters/value/interface';
import { LocationCompactInterface } from 'types/location/compact.interface';
import { LocationCompactMapType } from 'types/location/compact-map.type';

const locationsMapByLocale: Record<string, LocationCompactMapType> = {};

Object.keys(locationsByLocale).forEach((locale) => {
  const locations = (locationsByLocale as unknown as Record<string, LocationCompactInterface[]>)[locale];
  locationsMapByLocale[locale] = locations.reduce(
    (map: Record<string, LocationCompactInterface>, location: LocationCompactInterface) => {
      map[location.id] = location;
      return map;
    },
    {} as Record<string, LocationCompactInterface>
  );
});

// TODO-FE[CX-409] add tests
export const backendFiltersQueryToValue = (
  queryParams: FiltersQueryInterface,
  locale: string
): FiltersValueInterface => {
  const categoryId = (queryParams[FiltersQueryParametersEnum.categoryId] ||
    backendFiltersValueDefault[FiltersParametersEnum.categoryId]) as FiltersValueFieldCategoryIdType;

  const defaultPricePeriod = categoryIdIsRent(categoryId) ? Object.keys(configPriceChoicesDefinition.rent)[0] : '';

  return {
    [FiltersParametersEnum.locationsIds]:
      queryParams[FiltersQueryParametersEnum.locationsIds]?.split('-')?.map((id) => locationsMapByLocale[locale][id]) ||
      [],
    [FiltersParametersEnum.categoryId]: categoryId,
    [FiltersParametersEnum.propertyTypeId]:
      (queryParams[FiltersQueryParametersEnum.propertyTypeId] as FiltersValueFieldPropertyTypeIdType) || '',
    [FiltersParametersEnum.minBedroom]:
      (queryParams[FiltersQueryParametersEnum.minBedroom] as FiltersValueFieldMinBedroomType) || '',
    [FiltersParametersEnum.maxBedroom]:
      (queryParams[FiltersQueryParametersEnum.maxBedroom] as FiltersValueFieldMaxBedroomType) || '',
    [FiltersParametersEnum.minBathroom]:
      (queryParams[FiltersQueryParametersEnum.minBathroom] as FiltersValueFieldMinBathroomType) || '',
    [FiltersParametersEnum.maxBathroom]:
      (queryParams[FiltersQueryParametersEnum.maxBathroom] as FiltersValueFieldMaxBathroomType) || '',
    [FiltersParametersEnum.minPrice]: queryParams[FiltersQueryParametersEnum.minPrice]
      ? parseInt(queryParams[FiltersQueryParametersEnum.minPrice] as string, 10)
      : null,
    [FiltersParametersEnum.maxPrice]: queryParams[FiltersQueryParametersEnum.maxPrice]
      ? parseInt(queryParams[FiltersQueryParametersEnum.maxPrice] as string, 10)
      : null,
    [FiltersParametersEnum.furnishing]:
      (queryParams[FiltersQueryParametersEnum.furnishing] as FiltersValueFieldFurnishedType) || '',
    [FiltersParametersEnum.minArea]: queryParams[FiltersQueryParametersEnum.minArea]
      ? parseInt(queryParams[FiltersQueryParametersEnum.minArea] as string, 10)
      : null,
    [FiltersParametersEnum.maxArea]: queryParams[FiltersQueryParametersEnum.maxArea]
      ? parseInt(queryParams[FiltersQueryParametersEnum.maxArea] as string, 10)
      : null,
    [FiltersParametersEnum.pricePeriod]:
      (queryParams[FiltersQueryParametersEnum.pricePeriod] as FiltersValueFieldPricePeriodType) || defaultPricePeriod,
    [FiltersParametersEnum.keyword]: queryParams[FiltersQueryParametersEnum.keyword] || '',
    [FiltersParametersEnum.amenities]:
      (queryParams[FiltersQueryParametersEnum.amenities] as FiltersValueFieldAmenitiesType[]) || [],
    [FiltersParametersEnum.completionStatus]:
      (queryParams[FiltersQueryParametersEnum.completionStatus] as FiltersValueFieldCompletionStatusType) || '',
    [FiltersParametersEnum.paymentMethod]:
      (queryParams[FiltersQueryParametersEnum.paymentMethod] as FiltersValueFieldPaymentMethodType) || '',
    [FiltersParametersEnum.utilitiesPriceType]:
      (queryParams[FiltersQueryParametersEnum.utilitiesPriceType] as FiltersValueFieldUtilitiesPriceTypeType) || '',
    [FiltersParametersEnum.virtualViewings]:
      (queryParams[FiltersQueryParametersEnum.virtualViewings] as FiltersValueFieldVirtualViewingType) || '',
    [FiltersParametersEnum.sort]: (queryParams[FiltersQueryParametersEnum.sort] || 'mr') as FiltersValueFieldSortType,
    [FiltersParametersEnum.pageNumber]: parseInt(queryParams[FiltersQueryParametersEnum.pageNumber] || '1', 10),
  };
};
