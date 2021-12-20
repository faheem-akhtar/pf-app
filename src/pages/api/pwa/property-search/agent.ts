import { NextApiRequest, NextApiResponse } from 'next';

import { backendApiGetLocaleFromReq } from 'backend/api/get-locale-from-req';
import { backendApiPropertyAgentFetcher } from 'backend/api/property/agent/fetcher';
import { backendApiPropertyBrokerFetcher } from 'backend/api/property/broker/fetcher';
import { propertyAgentEnabledByDefault } from 'config/property/agent/enabled-by-default';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const locale = backendApiGetLocaleFromReq(req);
  const propertyId = req.query.propertyId as string;

  const fetcher = propertyAgentEnabledByDefault ? backendApiPropertyAgentFetcher : backendApiPropertyBrokerFetcher;

  fetcher(locale, propertyId).then((response) => {
    if (response.ok) {
      res.send(response.data);
    } else {
      res.status(response.error.status);

      // eslint-disable-next-line no-console
      console.error('property search agent failed', response.error);
      res.end();
    }
  });
};
