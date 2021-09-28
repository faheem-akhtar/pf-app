import { NextApiRequest, NextApiResponse } from 'next';

import { backendApiGetLocaleFromReq } from 'backend/api/get-locale-from-req';
import { backendApiPropertySearchEmailAgentDataFetcher } from 'backend/api/property/search/email-agent-data/fetcher';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const locale = backendApiGetLocaleFromReq(req);
  const propertyId = req.query.propertyId as string;

  backendApiPropertySearchEmailAgentDataFetcher(locale, propertyId).then((response) => {
    if (response.ok) {
      res.send(response.data);
    } else {
      res.status(500);

      // eslint-disable-next-line no-console
      console.error(response.error, 'property search email agent data failed');
      res.end();
    }
  });
};
