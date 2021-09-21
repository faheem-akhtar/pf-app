import { NextApiRequest, NextApiResponse } from 'next';

import { backendApiGetLocaleFromReq } from 'backend/api/get-locale-from-req';
import { backendApiPropertyStatsDataFetcher } from 'backend/api/property/stats-data/fetcher';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const locale = backendApiGetLocaleFromReq(req);
  const propertiesIds = req.query['propertiesIds[]'] as string[];
  const pageNumber = parseInt(req.query.pageNumber as string);

  return backendApiPropertyStatsDataFetcher({ locale, propertiesIds, pageNumber }).then((response) => {
    if (response.ok) {
      res.send(response.data);
    } else {
      res.status(500);
      // eslint-disable-next-line no-console
      console.error('property search stats data failed', response.error);
      res.end();
    }
  });
};
