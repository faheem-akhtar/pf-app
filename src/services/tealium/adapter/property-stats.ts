import { filtersMapCategoryIdToStats } from 'components/filters/map-category-id-to-stats';
import { FiltersValueInterface } from 'components/filters/value/interface';
import { propertySerpObfuscatedGetBathroomValue } from 'components/property/serp/obfuscated/get/bathroom-value';
import { propertySerpObfuscatedGetBedroomValue } from 'components/property/serp/obfuscated/get/bedroom-value';
import { propertySerpObfuscatedGetCompletionStatus } from 'components/property/serp/obfuscated/get/completion-status';
import { propertySerpObfuscatedGetDateInsert } from 'components/property/serp/obfuscated/get/date-insert';
import { propertySerpObfuscatedGetId } from 'components/property/serp/obfuscated/get/id';
import { propertySerpObfuscatedGetLocationTreeCompact } from 'components/property/serp/obfuscated/get/location-tree-compact';
import { propertySerpObfuscatedGetName } from 'components/property/serp/obfuscated/get/name';
import { propertySerpObfuscatedGetPriceText } from 'components/property/serp/obfuscated/get/price-text';
import { propertySerpObfuscatedGetPropertyTypeName } from 'components/property/serp/obfuscated/get/property-type-name';
import { propertySerpObfuscatedGetQualityScore } from 'components/property/serp/obfuscated/get/quality-score';
import { propertySerpObfuscatedGetReference } from 'components/property/serp/obfuscated/get/reference';
import { propertySerpObfuscatedGetSize } from 'components/property/serp/obfuscated/get/size';
import { propertySerpObfuscatedGetVerified } from 'components/property/serp/obfuscated/get/verified';
import { PropertySerpObfuscatedType } from 'components/property/serp/obfuscated/type';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { LocationTypeEnum } from 'enums/location/type.enum';
import { categoryIdIsRent } from 'helpers/category-id/is-rent';

import { TealiumPropertyStatsInterface } from '../property-stats.interface';
import { tealiumPropertySubCategories } from '../property-sub-categories';

export const tealiumAdapterPropertyStats = (
  property: PropertySerpObfuscatedType,
  filters: FiltersValueInterface,
  options?: { isTransactionalEvent?: boolean }
): TealiumPropertyStatsInterface => {
  const propertyId = propertySerpObfuscatedGetId(property);
  const categoryId = filters[FiltersParametersEnum.categoryId];
  const categoryIdentifier = filtersMapCategoryIdToStats[categoryId];

  const locationTreeCompact = propertySerpObfuscatedGetLocationTreeCompact(property);

  const variables: TealiumPropertyStatsInterface = {
    property_completion: propertySerpObfuscatedGetCompletionStatus(property) || '',
    property_listed_days: propertySerpObfuscatedGetDateInsert(property),
    property_qs: propertySerpObfuscatedGetQualityScore(property),
    property_category: categoryIdentifier,
    property_sub_category: tealiumPropertySubCategories[categoryIdentifier],
    property_listing_id: propertyId,
    property_location0_id: locationTreeCompact[0]?.id || '',
    property_location1_id: locationTreeCompact[1]?.id || '',
    property_location2_id: locationTreeCompact[2]?.id || '',
    property_location3_id: locationTreeCompact[3]?.id || '',
    property_location4_id: locationTreeCompact[4]?.id || '',
    property_location_city:
      locationTreeCompact.find((location) => location.location_type === LocationTypeEnum.city.toLowerCase())?.name ||
      '',
    property_location_community:
      locationTreeCompact.find((location) => location.location_type === LocationTypeEnum.community.toLowerCase())
        ?.name || '',
    property_location_sub_community:
      locationTreeCompact.find((location) => location.location_type === LocationTypeEnum.subcommunity.toLowerCase())
        ?.name || '',
    property_location_tower:
      locationTreeCompact.find((location) => location.location_type === LocationTypeEnum.tower.toLowerCase())?.name ||
      '',
    property_name: propertySerpObfuscatedGetName(property),
    property_price: propertySerpObfuscatedGetPriceText(property),
    property_reference: propertySerpObfuscatedGetReference(property),
    property_rental_period: categoryIdIsRent(categoryId) ? filters[FiltersParametersEnum.pricePeriod] || '' : '',
    property_size_sqft: `${propertySerpObfuscatedGetSize(property)}`,
    property_type: propertySerpObfuscatedGetPropertyTypeName(property),
    property_verified_status: `${propertySerpObfuscatedGetVerified(property)}`,
    property_bathrooms: `${propertySerpObfuscatedGetBathroomValue(property) || 0}`,
    property_bedrooms: `${propertySerpObfuscatedGetBedroomValue(property)}`,
  };

  if (options?.isTransactionalEvent) {
    variables.property_transaction_id = propertyId;
  }

  return variables;
};
