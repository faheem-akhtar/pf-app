import { filtersToSearchQuery } from 'components/filters/to-search-query';
import { FiltersValueInterface } from 'components/filters/value/interface';

import { backendApiPropertySearchRawFetcher } from './raw-fetcher';

export const backendApiPropertySearchFetcher = (
  locale: string,
  filtersValue: FiltersValueInterface
): ReturnType<typeof backendApiPropertySearchRawFetcher> => {
  return backendApiPropertySearchRawFetcher({
    locale,
    query: filtersToSearchQuery(filtersValue),
  });
};
