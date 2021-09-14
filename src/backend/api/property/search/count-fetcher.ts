import { BackendApiFactory } from 'backend/api/factory';
import { filtersToSearchQuery } from 'components/filters/to-search-query';
import { FiltersValueInterface } from 'components/filters/value/interface';

import { BackendApiPropertySearchCountResultType } from './count-result.type';

const fetcher = BackendApiFactory<BackendApiPropertySearchCountResultType>({
  method: 'GET',
  url: 'search/count',
});

export const backendApiPropertySearchCountFetcher = (
  locale: string,
  filtersValue: FiltersValueInterface
): ReturnType<typeof fetcher> => {
  return fetcher({
    locale,
    query: filtersToSearchQuery(filtersValue),
  });
};
