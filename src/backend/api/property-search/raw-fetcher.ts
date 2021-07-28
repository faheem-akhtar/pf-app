import { BackendApiFactory } from 'backend/api/factory';
import { backendApiPropertySearchMapper } from './mapper';

import { BackendApiPropertySearchJsonApiResultType } from './json-api-result.type';
import { BackendApiPropertySearchRawJsonResponseType } from './raw-json-response-type';
import { PropertySearchResultType } from 'components/property/search-result.type';

export const backendApiPropertySearchRawFetcher = BackendApiFactory<
  PropertySearchResultType,
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
