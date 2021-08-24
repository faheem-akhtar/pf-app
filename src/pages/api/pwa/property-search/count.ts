import { NextApiRequest, NextApiResponse } from 'next';

import { backendApiGetLocaleFromReq } from 'backend/api/get-locale-from-req';
import { backendApiPropertySearchFetcher } from 'backend/api/property/search/fetcher';
import { backendFiltersQueryToValue } from 'backend/filters/query/to-value';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const locale = backendApiGetLocaleFromReq(req);

  const filtersValue = backendFiltersQueryToValue(req.query, locale);

  backendApiPropertySearchFetcher(locale, filtersValue).then((response) => {
    if (response.ok) {
      res.send(response.data.total);
    } else {
      res.status(500);
      // eslint-disable-next-line no-console
      console.error('property search count failed', response.error);
      res.end();
    }
  });
};
