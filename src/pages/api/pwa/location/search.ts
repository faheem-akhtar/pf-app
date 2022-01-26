import { NextApiRequest, NextApiResponse } from 'next';

import { backendApiGetLocaleFromReq } from 'backend/api/get-locale-from-req';
import { backendApiLocationFetcher } from 'backend/api/location/fetcher';

export default (req: NextApiRequest, res: NextApiResponse): void => {
  backendApiLocationFetcher({ locale: backendApiGetLocaleFromReq(req) }).then((response) => {
    if (response.ok) {
      res.send(response.data);
      res.end();
    } else {
      // eslint-disable-next-line no-console
      console.error(`API_FAILED:LOCATION_SEARCH:${response.error?.body || response.error}`);
      res.status(response.error.status);
      res.end();
    }
  });
};
