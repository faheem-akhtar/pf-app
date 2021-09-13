import { NextApiRequest, NextApiResponse } from 'next';

import { backendApiGetLocaleFromReq } from 'backend/api/get-locale-from-req';
import { backendApiPropertyReportFetcher } from 'backend/api/property/report/fetcher';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const locale = backendApiGetLocaleFromReq(req);
  const { propertyId, attributes } = JSON.parse(req.body);

  backendApiPropertyReportFetcher(locale, propertyId, attributes).then((response) => {
    if (response.ok) {
      res.send(response.data);
    } else {
      res.status(500);
      // eslint-disable-next-line no-console
      console.error('property report failed', response.error);
      res.end();
    }
  });
};
