import { BackendApiFactory } from 'backend/api/factory';
import { PropertySerpSearchResultType } from 'components/property/serp/search-result.type';
import { propertySerpItemsPerPage } from 'constants/property/serp/items-per-page';

import { BackendApiPropertySearchJsonApiResultType } from './json-api-result.type';
import { backendApiPropertySearchMapper } from './mapper';
import { BackendApiPropertySearchRawJsonResponseType } from './raw-json-response-type';

export const backendApiPropertySearchRawFetcher = BackendApiFactory<
  PropertySerpSearchResultType,
  BackendApiPropertySearchJsonApiResultType,
  BackendApiPropertySearchRawJsonResponseType
>({
  method: 'GET',
  url: 'search',
  queryDefaultParams: {
    'page[limit]': propertySerpItemsPerPage,
    sort: 'mr',
  },
  dataMapper: backendApiPropertySearchMapper,
});
