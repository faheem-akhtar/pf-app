import { BackendApiFactory } from 'backend/api/factory';
import { backendApiPropertySearchMapper } from './mapper';

import { BackendApiPropertySearchJsonApiResultType } from './json-api-result.type';
import { BackendApiPropertySearchRawJsonResponseType } from './raw-json-response-type';
import { PropertySerpSearchResultType } from 'components/property/serp/search-result.type';

export const backendApiPropertySearchRawFetcher = BackendApiFactory<
  PropertySerpSearchResultType,
  BackendApiPropertySearchJsonApiResultType,
  BackendApiPropertySearchRawJsonResponseType
>({
  method: 'GET',
  url: 'search',
  queryDefaultParams: {
    include: 'properties,properties.property_type',
    'page[limit]': 25,
    sort: 'mr',
  },
  dataMapper: backendApiPropertySearchMapper,
});
