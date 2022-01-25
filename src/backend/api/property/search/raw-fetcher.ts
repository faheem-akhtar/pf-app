import { BackendApiFactory } from 'backend/api/factory';
import { PROPERTY_SERP_ITEMS_PER_PAGE } from 'components/property/serp/items-per-page.constant';
import { PropertySerpSearchResultType } from 'components/property/serp/search-result.type';

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
    'page[limit]': PROPERTY_SERP_ITEMS_PER_PAGE,
    sort: 'mr',
  },
  dataMapper: backendApiPropertySearchMapper,
});
