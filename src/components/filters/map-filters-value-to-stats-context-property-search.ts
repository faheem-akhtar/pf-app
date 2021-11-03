import { StatsContextPropertySearchInterface } from '@propertyfinder/pf-frontend-common/dist/module/stats/context/property-search.interface';
import { CtaSortPropertyType } from '@propertyfinder/pf-frontend-common/dist/module/stats/types';

import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { objectFilterNonOrEmptyValue } from 'helpers/object/filter/non-or-empty-value';

import { FiltersValueInterface } from './value/interface';

export const filtersMapFiltersValueToStatsContextPropertySearch = (
  filtersValue: FiltersValueInterface
): StatsContextPropertySearchInterface => {
  const minPrice = filtersValue[FiltersParametersEnum.minPrice];
  const maxPrice = filtersValue[FiltersParametersEnum.maxPrice];
  const minArea = filtersValue[FiltersParametersEnum.minArea];
  const maxArea = filtersValue[FiltersParametersEnum.maxArea];
  const minBedroom = filtersValue[FiltersParametersEnum.minBedroom];
  const maxBedroom = filtersValue[FiltersParametersEnum.maxBedroom];
  const minBathroom = filtersValue[FiltersParametersEnum.minBathroom];
  const maxBathroom = filtersValue[FiltersParametersEnum.maxBathroom];
  const furnishing = filtersValue[FiltersParametersEnum.furnishing];
  const propertyTypeId = filtersValue[FiltersParametersEnum.propertyTypeId];

  return objectFilterNonOrEmptyValue({
    category: parseInt(filtersValue[FiltersParametersEnum.categoryId]),
    locations: filtersValue[FiltersParametersEnum.locationsIds].map((l) => parseInt(l.id)),
    property_type_id: propertyTypeId === '' ? undefined : parseInt(propertyTypeId),
    rental_period: filtersValue[FiltersParametersEnum.pricePeriod],
    price_min: minPrice === null ? undefined : minPrice,
    price_max: maxPrice === null ? undefined : maxPrice,
    payment_method: filtersValue[FiltersParametersEnum.paymentMethod],
    min_installment_years: filtersValue[FiltersParametersEnum.minInstallmentYears],
    max_installment_years: filtersValue[FiltersParametersEnum.maxInstallmentYears],
    bedroom_min: minBedroom ? parseInt(minBedroom) : undefined,
    bedroom_max: maxBedroom ? parseInt(maxBedroom) : undefined,
    bathroom_min: minBathroom ? parseInt(minBathroom) : undefined,
    bathroom_max: maxBathroom ? parseInt(maxBathroom) : undefined,
    area_min: minArea === null ? undefined : minArea,
    area_max: maxArea === null ? undefined : maxArea,
    utilities_price_type: filtersValue[FiltersParametersEnum.utilitiesPriceType],
    virtual_viewings: filtersValue[FiltersParametersEnum.virtualViewings],
    is_developer_property: filtersValue[FiltersParametersEnum.isDeveloperProperty],
    furnished: furnishing ? parseInt(furnishing) : undefined,
    amenities: filtersValue[FiltersParametersEnum.amenities],
    keywords: filtersValue[FiltersParametersEnum.keyword],
    sort: filtersValue[FiltersParametersEnum.sort] as CtaSortPropertyType,
    completion_status: filtersValue[FiltersParametersEnum.completionStatus],
  });
};
