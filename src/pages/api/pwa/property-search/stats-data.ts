import { NextApiRequest, NextApiResponse } from 'next';

import { backendApiGetLocaleFromReq } from 'backend/api/get-locale-from-req';
import { backendApiPropertyStatsDataFetcher } from 'backend/api/property/stats-data/fetcher';
import { configCacheStrategy } from 'config/cache/strategy';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const locale = backendApiGetLocaleFromReq(req);
  const propertiesIds = req.query['propertiesIds[]'] as string[];
  const pageNumber = parseInt(req.query.pageNumber as string);

  return backendApiPropertyStatsDataFetcher({ locale, propertiesIds, pageNumber }).then((response) => {
    if (response.ok) {
      if (response.data) {
        // No data indicates some failure in the api
        res.setHeader('cache-control', `max-age=${configCacheStrategy.shortTerm}`);
      }
      res.send(response.data);
    } else {
      res.status(response.error.status);
      // eslint-disable-next-line no-console
      console.error(`API_FAILED:PROPERTY_SEARCH_STATS_DATA:${response.error?.body || response.error}`);
      res.end();
    }
  });
};
