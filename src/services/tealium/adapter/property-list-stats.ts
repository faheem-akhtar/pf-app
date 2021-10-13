import { filtersMapCategoryIdToStats } from 'components/filters/map-category-id-to-stats';
import { FiltersValueInterface } from 'components/filters/value/interface';
import { propertySerpObfuscatedGetAgentId } from 'components/property/serp/obfuscated/get/agent-id';
import { propertySerpObfuscatedGetBrokerId } from 'components/property/serp/obfuscated/get/broker-id';
import { propertySerpObfuscatedGetDefaultPrice } from 'components/property/serp/obfuscated/get/default-price';
import { propertySerpObfuscatedGetId } from 'components/property/serp/obfuscated/get/id';
import { propertySerpObfuscatedGetListingLevel } from 'components/property/serp/obfuscated/get/listing-level';
import { propertySerpObfuscatedGetLocationTreeCompact } from 'components/property/serp/obfuscated/get/location-tree-compact';
import { propertySerpObfuscatedGetName } from 'components/property/serp/obfuscated/get/name';
import { propertySerpObfuscatedGetPropertyTypeName } from 'components/property/serp/obfuscated/get/property-type-name';
import { propertySerpObfuscatedGetReference } from 'components/property/serp/obfuscated/get/reference';
import { propertySerpObfuscatedGetSize } from 'components/property/serp/obfuscated/get/size';
import { PropertySerpObfuscatedType } from 'components/property/serp/obfuscated/type';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { LocationTypeEnum } from 'enums/location/type.enum';
import { AnyValueType } from 'types/any/value.type';

import { TealiumPropertyListStatsInterface } from '../property-list-stats.interface';
import { tealiumPropertySubCategories } from '../property-sub-categories';

export const tealiumAdapterPropertyListStats = (
  properties: PropertySerpObfuscatedType[],
  filters: FiltersValueInterface
): TealiumPropertyListStatsInterface => {
  const variables: TealiumPropertyListStatsInterface = {
    properties_agent_id: [],
    properties_broker_id: [],
    properties_category: [],
    properties_sub_category: [],
    properties_listing_depth: [],
    properties_listing_id: [],
    properties_location0_id: [],
    properties_location1_id: [],
    properties_location2_id: [],
    properties_location3_id: [],
    properties_location4_id: [],
    properties_location_city: [],
    properties_location_community: [],
    properties_location_sub_community: [],
    properties_location_tower: [],
    properties_name: [],
    properties_price: [],
    properties_reference: [],
    properties_rental_period: [],
    properties_size_sqft: [],
    properties_type: [],
  };

  const categoryId = filters[FiltersParametersEnum.categoryId];
  const categoryIdentifier = filtersMapCategoryIdToStats[categoryId];

  properties.reduce((vars, property, index) => {
    vars.properties_agent_id.push(propertySerpObfuscatedGetAgentId(property));
    vars.properties_broker_id.push(propertySerpObfuscatedGetBrokerId(property));
    vars.properties_category.push(categoryIdentifier);
    vars.properties_sub_category.push(tealiumPropertySubCategories[categoryIdentifier]);
    vars.properties_listing_id.push(propertySerpObfuscatedGetId(property));
    vars.properties_listing_depth.push(propertySerpObfuscatedGetListingLevel(property));
    const locationTreeCompact = propertySerpObfuscatedGetLocationTreeCompact(property);
    vars.properties_location0_id.push(locationTreeCompact[0]?.id || '');
    vars.properties_location1_id.push(locationTreeCompact[1]?.id || '');
    vars.properties_location2_id.push(locationTreeCompact[2]?.id || '');
    vars.properties_location3_id.push(locationTreeCompact[3]?.id || '');
    vars.properties_location4_id.push(locationTreeCompact[4]?.id || '');
    vars.properties_location_city.push('');
    vars.properties_location_community.push('');
    vars.properties_location_sub_community.push('');
    vars.properties_location_tower.push('');

    let locationTypeAdapter = 'properties_location_tower';
    locationTreeCompact.forEach(({ location_type, name }) => {
      switch (location_type?.toUpperCase()) {
        case LocationTypeEnum.city:
          locationTypeAdapter = 'properties_location_city';
          break;
        case LocationTypeEnum.community:
          locationTypeAdapter = 'properties_location_community';
          break;
        case LocationTypeEnum.subcommunity:
          locationTypeAdapter = 'properties_location_sub_community';
          break;
        default:
          locationTypeAdapter = 'properties_location_tower';
          break;
      }
      (vars as unknown as Record<string, AnyValueType[]>)[locationTypeAdapter][index] = name;
    });

    vars.properties_name.push(propertySerpObfuscatedGetName(property));
    vars.properties_price.push(`${propertySerpObfuscatedGetDefaultPrice(property)}`);
    vars.properties_reference.push(propertySerpObfuscatedGetReference(property));
    vars.properties_rental_period.push(filters[FiltersParametersEnum.pricePeriod] || '');
    vars.properties_type.push(propertySerpObfuscatedGetPropertyTypeName(property));
    vars.properties_size_sqft.push(`${propertySerpObfuscatedGetSize(property)}`);

    return vars;
  }, variables);

  return variables;
};
