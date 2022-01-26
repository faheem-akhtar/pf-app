import { NextApiRequest, NextApiResponse } from 'next';

import { backendApiGetLocaleFromReq } from 'backend/api/get-locale-from-req';
import { backendApiPropertyAgentFetcher } from 'backend/api/property/agent/fetcher';
import { backendApiPropertyBrokerFetcher } from 'backend/api/property/broker/fetcher';
import { configCacheStrategy } from 'config/cache/strategy';
import { propertyAgentEnabledByDefault } from 'config/property/agent/enabled-by-default';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const locale = backendApiGetLocaleFromReq(req);
  const propertyId = req.query.propertyId as string;

  const fetcher = propertyAgentEnabledByDefault ? backendApiPropertyAgentFetcher : backendApiPropertyBrokerFetcher;

  fetcher(locale, propertyId).then((response) => {
    if (response.ok) {
      res.setHeader('cache-control', `max-age=${configCacheStrategy.longTerm}`);
      res.send(response.data);
    } else {
      res.status(response.error.status);

      // eslint-disable-next-line no-console
      console.error(`API_FAILED:PROPERTY_SEARCH_AGENT:${response.error?.body || response.error}`);
      res.end();
    }
  });
};
