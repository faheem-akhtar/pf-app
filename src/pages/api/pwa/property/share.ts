import { NextApiRequest, NextApiResponse } from 'next';

import { backendApiGetLocaleFromReq } from 'backend/api/get-locale-from-req';
import { backendApiPropertyShareFetcher } from 'backend/api/property/share/fetcher';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const locale = backendApiGetLocaleFromReq(req);
  const { propertyId, attributes } = JSON.parse(req.body);

  backendApiPropertyShareFetcher(locale, propertyId, attributes).then((response) => {
    if (response.ok) {
      res.send(response.data);
    } else {
      res.status(500);
      // eslint-disable-next-line no-console
      console.error('property share failed', response.error);
      res.end();
    }
  });
};
