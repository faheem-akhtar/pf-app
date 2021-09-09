import { BackendApiFactory } from 'backend/api/factory';
import { BackendApiPropertySearchEmailAgentDataResultType } from './result-type';
import { BackendApiPropertySearchJsonApiResultType } from '../json-api-result.type';

import { backendApiPropertySearchEmailAgentDataMapper } from './mapper';

const fetcher = BackendApiFactory<
  BackendApiPropertySearchEmailAgentDataResultType,
  BackendApiPropertySearchJsonApiResultType
>({
  method: 'GET',
  url: 'search',
  queryDefaultParams: {
    include: 'properties,properties.location_tree,properties.property_type',
  },
  dataMapper: backendApiPropertySearchEmailAgentDataMapper,
});

export const backendApiPropertySearchEmailAgentDataFetcher = (
  locale: string,
  propertyId: string
): ReturnType<typeof fetcher> => {
  return fetcher({
    locale,
    query: {
      'filter[ids]': [propertyId],
      'page[limit]': 1,
    },
  });
};