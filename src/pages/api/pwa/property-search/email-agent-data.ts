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
      res.status(response.error.status);

      // eslint-disable-next-line no-console
      console.error('property search email agent data failed', response.error);
      res.end();
    }
  });
};
