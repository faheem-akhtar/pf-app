import { NextApiRequest, NextApiResponse } from 'next';
import { ApiFetcherResultType } from 'api/fetcher-result-type';

import { backendApiGetLocaleFromReq } from 'backend/api/get-locale-from-req';
import { backendApiPropertyEmailAlertFetcher } from 'backend/api/property/email-alert/fetcher';
import { backendApiPropertyLeadFetcher } from 'backend/api/property/lead/fetcher';
import { backendApiPropertySearchEmailAgentDataFetcher } from 'backend/api/property/search/email-agent-data/fetcher';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const locale = backendApiGetLocaleFromReq(req);
  const {
    attributes: { propertyId, email, emailAlert, ...formFields },
  } = JSON.parse(req.body);

  const requests = [
    (): Promise<ApiFetcherResultType<unknown>> =>
      backendApiPropertyLeadFetcher(locale, propertyId, { email, ...formFields }),
  ];

  if (emailAlert /* True if email alert is checked */) {
    const emailAgentDataResponse = await backendApiPropertySearchEmailAgentDataFetcher(locale, propertyId);

    if (!emailAgentDataResponse.ok) {
      // eslint-disable-next-line no-console
      console.error('Property email agent failed, emailAgentDataResponse', emailAgentDataResponse.error);
      res.status(500).end();
      return;
    }

    const { propertyLocationId, amenities, categoryId, propertyTypeId } = emailAgentDataResponse.data;

    requests.push(
      (): Promise<ApiFetcherResultType<unknown>> =>
        backendApiPropertyEmailAlertFetcher(locale, {
          amenities,
          email,
          category_ids: [categoryId],
          location_ids: [propertyLocationId],
          type_id: propertyTypeId,
        })
    );
  }

  const results = await Promise.all(requests.map((request) => request()));

  if (results.every((result) => result.ok)) {
    res.send({ ok: true });
  } else {
    res.status(500).end();
    results.forEach((result) => {
      if (!result.ok) {
        // eslint-disable-next-line no-console
        console.error('Property email agent failed', result.error);
      }
    });
  }
};
