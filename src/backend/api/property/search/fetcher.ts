import { filtersToSearchQuery } from 'components/filters/to-search-query';
import { FiltersValueInterface } from 'components/filters/value/interface';
import { cookieAbTestKey } from 'constants/cookie/ab-test-key';
import { headersAddCookie } from 'helpers/headers/add-cookie';

import { backendApiPropertySearchRawFetcher } from './raw-fetcher';

export const backendApiPropertySearchFetcher = (
  locale: string,
  filtersValue: FiltersValueInterface,
  abTestCookieValue: string
): ReturnType<typeof backendApiPropertySearchRawFetcher> => {
  return backendApiPropertySearchRawFetcher({
    locale,
    query: filtersToSearchQuery(filtersValue),
    alterHeaders: (headers) => headersAddCookie(cookieAbTestKey, abTestCookieValue, headers),
  });
};
