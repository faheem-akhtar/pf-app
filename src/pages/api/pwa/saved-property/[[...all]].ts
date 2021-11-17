/* eslint pf-rules/export-name-validation: 0 */

import { NextApiRequest, NextApiResponse } from 'next';

import { ApiHttpMethodType } from 'api/http-method.type';
import { backendApiGetLocaleFromReq } from 'backend/api/get-locale-from-req';
import { backendApiSavedPropertyFetcher } from 'backend/api/saved-property/fetcher';
import { configOriginIfDevUseStagingValue } from 'config/origin/if-dev-use-staging-value';
import { ApiHeaderEnum } from 'enums/api/header.enum';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const locale = backendApiGetLocaleFromReq(req);

  backendApiSavedPropertyFetcher(req.method as ApiHttpMethodType)({
    locale,
    alterHeaders: (headers) => {
      headers[ApiHeaderEnum.auth] = req.headers[ApiHeaderEnum.auth] as string;
      headers['content-type'] = 'application/vnd.api+json';
      headers['cache-control'] = 'no-cache, no-store, max-age=0, must-revalidate';
    },
    reloadCache: true,
    getOrigin: configOriginIfDevUseStagingValue,
    query: req.query,
    postData: req.body ? JSON.parse(req.body) : undefined,
  }).then((response) => {
    if (response.ok) {
      res.send(response.data);
    } else {
      res.status(response.error.status);
      // eslint-disable-next-line no-console
      console.error('saved property api failed', response.error);
      res.end();
    }
  });
};
