import { backendFiltersValueDefault } from 'backend/filters-value/default';

import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersQueryInterface } from './interface';
import { FiltersQueryParametersEnum } from 'enums/filters/query-parameters.enum';
import { FiltersValueFieldAmenities } from '../value/field/amenities';
import { FiltersValueFieldCategoryId } from '../value/field/category-id';
import { FiltersValueFieldCompletionStatus } from '../value/field/completion-status';
import { FiltersValueFieldFurnished } from '../value/field/furnished';
import { FiltersValueFieldMaxArea } from '../value/field/max-area';
import { FiltersValueFieldMaxBathroom } from '../value/field/max-bathroom';
import { FiltersValueFieldMaxBedroom } from '../value/field/max-bedroom';
import { FiltersValueFieldMinArea } from '../value/field/min-area';
import { FiltersValueFieldMinBathroom } from '../value/field/min-bathroom';
import { FiltersValueFieldMinBedroom } from '../value/field/min-bedroom';
import { FiltersValueFieldPaymentMethod } from '../value/field/payment-method';
import { FiltersValueFieldPriceType } from '../value/field/price-type';
import { FiltersValueFieldPropertyTypeId } from '../value/field/property-type-id';
import { FiltersValueFieldSort } from '../value/field/sort';
import { FiltersValueFieldUtilitiesPriceType } from '../value/field/utilities-price-type';
import { FiltersValueFieldVirtualViewing } from '../value/field/virtual-viewing';
import { FiltersValueInterface } from '../value/interface';
import { LocationCompactInterface } from 'components/location/compact.interface';

export const filtersQueryToValue = (
  queryParams: FiltersQueryInterface,
  locationsCompactMap: Record<string, LocationCompactInterface>
): FiltersValueInterface => {
  return {
    [FiltersParametersEnum.locationsIds]:
      queryParams[FiltersQueryParametersEnum.locationsIds]?.split('-')?.map((id) => locationsCompactMap[id]) || [],
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
