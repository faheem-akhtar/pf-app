import { FiltersCountFactory } from './factory';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';

export const filtersCountGetActiveFields = FiltersCountFactory([
  [FiltersParametersEnum.propertyTypeId],
  [FiltersParametersEnum.completionStatus],
  [FiltersParametersEnum.virtualViewings],
  [FiltersParametersEnum.furnishing],
  [FiltersParametersEnum.pricePeriod],
  [FiltersParametersEnum.amenities],
  [FiltersParametersEnum.keyword],
  [FiltersParametersEnum.paymentMethod],
  [FiltersParametersEnum.utilitiesPriceType],
  [FiltersParametersEnum.minPrice, FiltersParametersEnum.maxPrice],
  [FiltersParametersEnum.minBedroom, FiltersParametersEnum.maxBedroom],
  [FiltersParametersEnum.minBathroom, FiltersParametersEnum.maxBathroom],
  [FiltersParametersEnum.minArea, FiltersParametersEnum.maxArea],
]);
