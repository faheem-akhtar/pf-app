import { NextApiRequest, NextApiResponse } from 'next';

import { backendApiGetLocaleFromReq } from 'backend/api/get-locale-from-req';
import { backendApiPropertySearchCountFetcher } from 'backend/api/property/search/count-fetcher';
import { backendFiltersQueryToValue } from 'backend/filters/query/to-value';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const locale = backendApiGetLocaleFromReq(req);

  const filtersValue = backendFiltersQueryToValue(req.query, locale);

  return backendApiPropertySearchCountFetcher(locale, filtersValue).then((response) => {
    if (response.ok) {
      res.send(response.data.count);
    } else {
      res.status(500);
      // eslint-disable-next-line no-console
      console.error('property search count failed', response.error);
      res.end();
    }
  });
};
