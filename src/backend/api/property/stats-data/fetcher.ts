import { BackendApiFactory } from 'backend/api/factory';
import { PropertyObfuscatedStatsDataResultType } from 'components/property/obfuscated-stats-data-result.type';
import { configIsTrace } from 'config/is-trace';

import { BackendApiPropertySearchJsonApiResultType } from '../search/json-api-result.type';
import { BackendApiPropertyStatsDataFetcherPropsType } from './fetcher-props.type';
import { backendApiPropertyStatsDataMapper } from './mapper';

const fetcher = BackendApiFactory<
  { properties: PropertyObfuscatedStatsDataResultType[] },
  BackendApiPropertySearchJsonApiResultType
>({
  method: 'GET',
  url: 'search',
});

const fieldsToInclude = [
  'properties',
  'properties.property_type',
  'properties.property_images',
  'properties.location_tree',
  'properties.agent',
  'properties.agent.languages',
  'properties.broker',
  'properties.project',
  'properties.project.developer',
  'properties.project.images',
  'properties.project_property',
  'properties.project_property.unit',
  'properties.project_property.unit.floor_plans',
  'smart_ads',
  'smart_ads.agent',
  'smart_ads.broker',
  'smart_ads.property_type',
  'smart_ads.property_images',
  'smart_ads.location_tree',
  'direct_from_developer',
  'direct_from_developer.property_type',
  'direct_from_developer.property_images',
  'direct_from_developer.location_tree',
  'direct_from_developer.agent',
  'direct_from_developer.broker',
  'cts',
  'cts.agent',
  'cts.broker',
  'cts.property_type',
  'cts.property_images',
  'cts.location_tree',
  'similar_properties',
  'similar_properties.agent',
  'similar_properties.broker',
  'similar_properties.property_type',
  'similar_properties.property_images',
  'similar_properties.location_tree',
  'agent_smart_ads',
  'agent_smart_ads.broker',
  'agent_smart_ads.languages',
  'agent_properties_smart_ads',
  'agent_properties_smart_ads.agent',
  'agent_properties_smart_ads.broker',
  'agent_properties_smart_ads.location_tree',
  'agent_properties_smart_ads.property_type',
  'agent_properties_smart_ads.property_images',
];

export const backendApiPropertyStatsDataFetcher = (
  props: BackendApiPropertyStatsDataFetcherPropsType
): ReturnType<typeof fetcher> => {
  const { locale, propertiesIds } = props;

  return fetcher({
    locale,
    query: {
      'filter[ids]': propertiesIds,
      'page[limit]': propertiesIds.length,
      include: fieldsToInclude.join(','),
    },
    dataMapper: (properties, rawResponse) => {
      const obfuscatedProperties = backendApiPropertyStatsDataMapper(
        properties as BackendApiPropertySearchJsonApiResultType,
        props
      );

      const result = {
        properties: obfuscatedProperties,
      };

      if (configIsTrace) {
        (result as Record<string, object>).__full = JSON.parse(JSON.stringify(rawResponse));
      }

      return result;
    },
  });
};
