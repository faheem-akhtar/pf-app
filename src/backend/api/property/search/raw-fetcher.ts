import { BackendApiFactory } from 'backend/api/factory';
import { PropertySerpSearchResultType } from 'components/property/serp/search-result.type';
import { propertySerpItemsPerPage } from 'constants/property/serp/items-per-page';

import { BackendApiPropertySearchJsonApiResultType } from './json-api-result.type';
import { backendApiPropertySearchMapper } from './mapper';
import { BackendApiPropertySearchRawJsonResponseType } from './raw-json-response-type';

const include = ['properties', 'smart_ads', 'cts', 'direct_from_developer']
  .reduce((acc, key) => {
    acc.push(key);
    acc.push(`${key}.property_type`);
    return acc;
  }, [] as string[])
  .join(',');

export const backendApiPropertySearchRawFetcher = BackendApiFactory<
  PropertySerpSearchResultType,
  BackendApiPropertySearchJsonApiResultType,
  BackendApiPropertySearchRawJsonResponseType
>({
  method: 'GET',
  url: 'search',
  queryDefaultParams: {
    include,
    'page[limit]': propertySerpItemsPerPage,
    sort: 'mr',
  },
  dataMapper: backendApiPropertySearchMapper,
});
