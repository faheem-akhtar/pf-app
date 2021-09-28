import { NextApiRequest, NextApiResponse } from 'next';

import { ApiHttpMethodType } from 'api/http-method.type';
import { backendApiGetLocaleFromReq } from 'backend/api/get-locale-from-req';
import { backendApiSaveSearchFetcher } from 'backend/api/save-search/fetcher';
import { configOriginIfDevUseStagingValue } from 'config/origin/if-dev-use-staging-value';
import { ApiHeaderEnum } from 'enums/api/header.enum';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const locale = backendApiGetLocaleFromReq(req);

  backendApiSaveSearchFetcher(req.method as ApiHttpMethodType)({
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
      res.status(500);
      // eslint-disable-next-line no-console
      console.error(response.error, 'save search api failed');
      res.end();
    }
  });
};
