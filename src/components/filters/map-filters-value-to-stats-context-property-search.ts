import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { objectFilterNonOrEmptyValue } from 'helpers/object/filter/non-or-empty-value';

import { FiltersValueInterface } from './value/interface';

export const filtersMapFiltersValueToStatsContextPropertySearch = (filtersValue: FiltersValueInterface): any => {
  const minPrice = filtersValue[FiltersParametersEnum.minPrice];
  const maxPrice = filtersValue[FiltersParametersEnum.maxPrice];
  const minArea = filtersValue[FiltersParametersEnum.minArea];
  const maxArea = filtersValue[FiltersParametersEnum.maxArea];
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
    bedrooms: filtersValue[FiltersParametersEnum.bedrooms],
    bathrooms: filtersValue[FiltersParametersEnum.bathrooms],
    area_min: minArea === null ? undefined : minArea,
    area_max: maxArea === null ? undefined : maxArea,
    utilities_price_type: filtersValue[FiltersParametersEnum.utilitiesPriceType],
    virtual_viewings: filtersValue[FiltersParametersEnum.virtualViewings],
    is_developer_property: filtersValue[FiltersParametersEnum.isDeveloperProperty],
    furnished: furnishing ? parseInt(furnishing) : undefined,
    amenities: filtersValue[FiltersParametersEnum.amenities],
    keywords: filtersValue[FiltersParametersEnum.keyword],
    sort: filtersValue[FiltersParametersEnum.sort] as any,
    completion_status: filtersValue[FiltersParametersEnum.completionStatus],
  });
};
