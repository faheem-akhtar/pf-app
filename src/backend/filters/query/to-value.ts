import locationsByLocale from '../../../../public/static/locations';

import { backendFiltersValueDefault } from 'backend/filters/value/default';

import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersQueryInterface } from 'components/filters/query/interface';
import { FiltersQueryParametersEnum } from 'enums/filters/query-parameters.enum';
import { FiltersValueFieldAmenities } from 'components/filters/value/field/amenities';
import { FiltersValueFieldCategoryId } from 'components/filters/value/field/category-id';
import { FiltersValueFieldCompletionStatus } from 'components/filters/value/field/completion-status';
import { FiltersValueFieldFurnished } from 'components/filters/value/field/furnished';
import { FiltersValueFieldMaxArea } from 'components/filters/value/field/max-area';
import { FiltersValueFieldMaxBathroom } from 'components/filters/value/field/max-bathroom';
import { FiltersValueFieldMaxBedroom } from 'components/filters/value/field/max-bedroom';
import { FiltersValueFieldMinArea } from 'components/filters/value/field/min-area';
import { FiltersValueFieldMinBathroom } from 'components/filters/value/field/min-bathroom';
import { FiltersValueFieldMinBedroom } from 'components/filters/value/field/min-bedroom';
import { FiltersValueFieldPaymentMethod } from 'components/filters/value/field/payment-method';
import { FiltersValueFieldPriceType } from 'components/filters/value/field/price-type';
import { FiltersValueFieldPropertyTypeId } from 'components/filters/value/field/property-type-id';
import { FiltersValueFieldSort } from 'components/filters/value/field/sort';
import { FiltersValueFieldUtilitiesPriceType } from 'components/filters/value/field/utilities-price-type';
import { FiltersValueFieldVirtualViewing } from 'components/filters/value/field/virtual-viewing';
import { FiltersValueInterface } from 'components/filters/value/interface';
import { LocationCompactInterface } from 'components/location/compact.interface';
import { LocationCompactMapType } from 'components/location/compact-map.type';

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

export const backendFiltersQueryToValue = (
  queryParams: FiltersQueryInterface,
  locale: string
): FiltersValueInterface => {
  return {
    [FiltersParametersEnum.locationsIds]:
      queryParams[FiltersQueryParametersEnum.locationsIds]?.split('-')?.map((id) => locationsMapByLocale[locale][id]) ||
      [],
    [FiltersParametersEnum.categoryId]: (queryParams[FiltersQueryParametersEnum.categoryId] ||
      backendFiltersValueDefault[FiltersParametersEnum.categoryId]) as FiltersValueFieldCategoryId,
    [FiltersParametersEnum.propertyTypeId]:
      (queryParams[FiltersQueryParametersEnum.propertyTypeId] as FiltersValueFieldPropertyTypeId) || '',
    [FiltersParametersEnum.minBedroom]:
      (queryParams[FiltersQueryParametersEnum.minBedroom] as FiltersValueFieldMinBedroom) || '',
    [FiltersParametersEnum.maxBedroom]:
      (queryParams[FiltersQueryParametersEnum.maxBedroom] as FiltersValueFieldMaxBedroom) || '',
    [FiltersParametersEnum.minBathroom]:
      (queryParams[FiltersQueryParametersEnum.minBathroom] as FiltersValueFieldMinBathroom) || '',
    [FiltersParametersEnum.maxBathroom]:
      (queryParams[FiltersQueryParametersEnum.maxBathroom] as FiltersValueFieldMaxBathroom) || '',
    [FiltersParametersEnum.minPrice]: queryParams[FiltersQueryParametersEnum.minPrice]
      ? parseInt(queryParams[FiltersQueryParametersEnum.minPrice] as string, 10)
      : null,
    [FiltersParametersEnum.maxPrice]: queryParams[FiltersQueryParametersEnum.maxPrice]
      ? parseInt(queryParams[FiltersQueryParametersEnum.maxPrice] as string, 10)
      : null,
    [FiltersParametersEnum.furnishing]:
      (queryParams[FiltersQueryParametersEnum.furnishing] as FiltersValueFieldFurnished) || '',
    [FiltersParametersEnum.minArea]:
      (queryParams[FiltersQueryParametersEnum.minArea] as FiltersValueFieldMinArea) || '',
    [FiltersParametersEnum.maxArea]:
      (queryParams[FiltersQueryParametersEnum.maxArea] as FiltersValueFieldMaxArea) || '',
    [FiltersParametersEnum.pricePeriod]:
      (queryParams[FiltersQueryParametersEnum.pricePeriod] as FiltersValueFieldPriceType) || '',
    [FiltersParametersEnum.keyword]: queryParams[FiltersQueryParametersEnum.keyword] || '',
    [FiltersParametersEnum.amenities]:
      (queryParams[FiltersQueryParametersEnum.amenities] as FiltersValueFieldAmenities[]) || [],
    [FiltersParametersEnum.completionStatus]:
      (queryParams[FiltersQueryParametersEnum.completionStatus] as FiltersValueFieldCompletionStatus) || '',
    [FiltersParametersEnum.paymentMethod]:
      (queryParams[FiltersQueryParametersEnum.paymentMethod] as FiltersValueFieldPaymentMethod) || '',
    [FiltersParametersEnum.utilitiesPriceType]:
      (queryParams[FiltersQueryParametersEnum.utilitiesPriceType] as FiltersValueFieldUtilitiesPriceType) || '',
    [FiltersParametersEnum.virtualViewings]:
      (queryParams[FiltersQueryParametersEnum.virtualViewings] as FiltersValueFieldVirtualViewing) || '',
    [FiltersParametersEnum.sort]: (queryParams[FiltersQueryParametersEnum.sort] as FiltersValueFieldSort) || '',
    [FiltersParametersEnum.pageNumber]: parseInt(queryParams[FiltersQueryParametersEnum.pageNumber] || '1', 10),
  };
};
