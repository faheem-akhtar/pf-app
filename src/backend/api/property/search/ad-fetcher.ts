import { filtersToSearchQuery } from 'components/filters/to-search-query';
import { FiltersValueInterface } from 'components/filters/value/interface';
import { cookieAbTestKey } from 'constants/cookie/ab-test-key';
import { headersAddCookie } from 'helpers/headers/add-cookie';

import { backendApiPropertySearchRawFetcher } from './raw-fetcher';

const include = ['smart_ads', 'cts']
  .reduce((acc, key) => {
    acc.push(key);
    acc.push(...[`${key}.property_type`, `${key}.agent`, `${key}.broker`, `${key}.location_tree`]);
    return acc;
  }, [] as string[])
  .join(',');

export const backendApiPropertySearchAdFetcher = (
  locale: string,
  filtersValue: FiltersValueInterface,
  abTestCookieValue: string,
  userAgent: string
): ReturnType<typeof backendApiPropertySearchRawFetcher> =>
  backendApiPropertySearchRawFetcher({
    locale,
    query: {
      ...filtersToSearchQuery(filtersValue),
      include,
      // Only 2 ads are required to be display. So no need to pass default 25 value.
      'page[limit]': 3,
      break_thru_cache: Math.random(),
    },
    alterHeaders: (headers) => {
      headersAddCookie(cookieAbTestKey, abTestCookieValue, headers);
      // Staging do not respect the x-akamai-device-characteristics, so we have to add this workaround with passing the client user agent
      // So staging enviroment correctly identifies is it mobile or not
      // This will no longer be required once ab-tests implementation is moved to the pf-web-app
      // But as of now we read abTests information from the headers of the search api response and it is platform specific
      headers['user-agent'] = userAgent;
    },
  });
