import { filtersDataChoicesGetAmenities } from 'components/filters/data/choices/get-amenities';
import { filtersDataChoicesGetCompletionStatus } from 'components/filters/data/choices/get-completion-status';
import { filtersDataChoicesGetFurnished } from 'components/filters/data/choices/get-furnished';
import { filtersDataChoicesGetPricePeriod } from 'components/filters/data/choices/get-price-period';
import { filtersDataChoicesGetPropertyTypeId } from 'components/filters/data/choices/get-property-type-id';
import { FiltersDataInterface } from 'components/filters/data/interface';
import { filtersMapCategoryIdToStats } from 'components/filters/map-category-id-to-stats';
import { FiltersValueInterface } from 'components/filters/value/interface';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { helpersFiltersGetSelectedChoice } from 'helpers/filters/get-selected-choice';

import { TealiumPropertySearchStatsInterface } from '../property-search-stats.interface';

export const tealiumAdapterSearchStats = (
  filters: FiltersValueInterface,
  filtersData: FiltersDataInterface
): TealiumPropertySearchStatsInterface => {
  return {
    search_category: filtersMapCategoryIdToStats[filters[FiltersParametersEnum.categoryId]],
    search_property_type:
      helpersFiltersGetSelectedChoice(
        filtersDataChoicesGetPropertyTypeId(filters, filtersData),
        filters[FiltersParametersEnum.propertyTypeId]
      )?.label || '',
    search_locations: filters[FiltersParametersEnum.locationsIds].map((location) => location.name),
    search_furnishing:
      helpersFiltersGetSelectedChoice(
        filtersDataChoicesGetFurnished(filters, filtersData),
        filters[FiltersParametersEnum.furnishing]
      )?.label || '',
    search_rental_period:
      helpersFiltersGetSelectedChoice(
        filtersDataChoicesGetPricePeriod(filters, filtersData),
        filters[FiltersParametersEnum.pricePeriod]
      )?.label || '',
    search_amenities: filtersDataChoicesGetAmenities(filters, filtersData).map((amenity) => amenity.value),
    search_completion:
      helpersFiltersGetSelectedChoice(
        filtersDataChoicesGetCompletionStatus(filters, filtersData),
        filters[FiltersParametersEnum.completionStatus]
      )?.value || '',
    search_keywords: filters[FiltersParametersEnum.keyword] || '',
    search_bedrooms: filters[FiltersParametersEnum.bedrooms] || [],
    search_bathrooms: filters[FiltersParametersEnum.bathrooms] || [],
    search_max_area: `${filters[FiltersParametersEnum.maxArea] || ''}`,
    search_min_area: `${filters[FiltersParametersEnum.minArea] || ''}`,
    search_max_price: `${filters[FiltersParametersEnum.maxPrice] || ''}`,
    search_min_price: `${filters[FiltersParametersEnum.minPrice] || ''}`,
    search_viewings_type: filters[FiltersParametersEnum.virtualViewings] || '',
  };
};
