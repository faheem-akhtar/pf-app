import { NextApiRequest, NextApiResponse } from 'next';

import { ApiHttpMethodType } from 'api/http-method.type';
import { backendApiContactedPropertyFetcher } from 'backend/api/contacted-property/fetcher';
import { backendApiGetLocaleFromReq } from 'backend/api/get-locale-from-req';
import { configOriginIfDevUseStagingValue } from 'config/origin/if-dev-use-staging-value';
import { ApiHeaderEnum } from 'enums/api/header.enum';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const locale = backendApiGetLocaleFromReq(req);

  backendApiContactedPropertyFetcher(req.method as ApiHttpMethodType)({
    locale,
    alterHeaders: (headers) => {
      headers[ApiHeaderEnum.auth] = req.headers[ApiHeaderEnum.auth] as string;
      headers['content-type'] = 'application/vnd.api+json';
    },
    getOrigin: configOriginIfDevUseStagingValue,
    query: req.query,
    postData: req.body ? JSON.parse(req.body) : undefined,
  }).then((response) => {
    if (response.ok) {
      res.send(response.data);
    } else {
      res.status(response.error.status);
      // eslint-disable-next-line no-console
      console.error('contacted property api failed', response.error);
      res.end();
    }
  });
};
