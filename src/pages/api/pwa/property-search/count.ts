import { NextApiRequest, NextApiResponse } from 'next';

import { backendApiGetLocaleFromReq } from 'backend/api/get-locale-from-req';
import { backendApiPropertySearchCountFetcher } from 'backend/api/property/search/count-fetcher';
import { backendFiltersQueryToValue } from 'backend/filters/query/to-value';
import { configCacheStrategy } from 'config/cache/strategy';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const locale = backendApiGetLocaleFromReq(req);

  const filtersValue = backendFiltersQueryToValue(req.query, locale);

  return backendApiPropertySearchCountFetcher(locale, filtersValue).then((response) => {
    if (response.ok) {
      if (response.data) {
        // No data indicates some failure in the api
        res.setHeader('cache-control', `max-age=${configCacheStrategy.shortTerm}`);
      }
      res.send(response.data?.count || 0);
    } else {
      res.status(response.error.status);
      // eslint-disable-next-line no-console
      console.error(`API_FAILED:PROPERTY_SEARCH_COUNT:${response.error?.body || response.error}`);
      res.end();
    }
  });
};
