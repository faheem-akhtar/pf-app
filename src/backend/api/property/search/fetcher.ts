import { AB_TEST_COOKIE_STORAGE_KEY } from 'components/ab-test/cookie-storage-key.constant';
import { filtersToSearchQuery } from 'components/filters/to-search-query';
import { FiltersValueInterface } from 'components/filters/value/interface';
import { headersAddCookie } from 'helpers/headers/add-cookie';

import { backendApiPropertySearchRawFetcher } from './raw-fetcher';

const include = ['properties', 'direct_from_developer']
  .reduce(
    (acc, key) => {
      acc.push(key);
      acc.push(`${key}.property_type`);
      return acc;
    },
    ['properties.agent', 'properties.broker', 'properties.location_tree']
  )
  .join(',');

export const backendApiPropertySearchFetcher = (
  locale: string,
  filtersValue: FiltersValueInterface,
  abTestCookieValue: string,
  userAgent: string
): ReturnType<typeof backendApiPropertySearchRawFetcher> => {
  return backendApiPropertySearchRawFetcher({
    locale,
    query: {
      ...filtersToSearchQuery(filtersValue),
      include,
    },
    alterHeaders: (headers) => {
      headersAddCookie(AB_TEST_COOKIE_STORAGE_KEY, abTestCookieValue, headers);
      // Staging do not respect the x-akamai-device-characteristics, so we have to add this workaround with passing the client user agent
      // So staging enviroment correctly identifies is it mobile or not
      // This will no longer be required once ab-tests implementation is moved to the pf-web-app
      // But as of now we read abTests information from the headers of the search api response and it is platform specific
      headers['user-agent'] = userAgent;
    },
  });
};
