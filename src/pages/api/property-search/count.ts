import { NextApiRequest, NextApiResponse } from 'next';

import { backendApiGetLocaleFromReq } from 'backend/api/get-locale-from-req';
import { backendApiLocationAllFetcher } from 'backend/api/location/all-fetcher';
import { backendApiPropertySearchFetcher } from 'backend/api/property-search/fetcher';
import { filtersQueryToValue } from 'components/filters/query/to-value';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const locale = backendApiGetLocaleFromReq(req);

  // TODO-FE[TPNX-3047] consider fetching locations during the build
  const allLocationsResult = await backendApiLocationAllFetcher({ locale });

  if (!allLocationsResult.ok) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch locations', allLocationsResult.error);
    res.status(500);
    res.end();
    return;
  }

  const filtersValue = filtersQueryToValue(req.query, allLocationsResult.data);

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
