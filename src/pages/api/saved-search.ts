import { NextApiRequest, NextApiResponse } from 'next';

import { backendApiGetLocaleFromReq } from 'backend/api/get-locale-from-req';
import { backendApiSaveSearchFetcher } from 'backend/api/save-search/fetcher';

import { ApiHeaderEnum } from 'enums/api/header.enum';
import { configOriginIfDevUseStagingValue } from 'config/origin/if-dev-use-staging-value';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const locale = backendApiGetLocaleFromReq(req);
  backendApiSaveSearchFetcher({
    locale,
    alterHeaders: (headers) => {
      headers[ApiHeaderEnum.auth] = req.headers[ApiHeaderEnum.auth] as string;
    },
    getOrigin: configOriginIfDevUseStagingValue,
  }).then((response) => {
    if (response.ok) {
      res.send(response.data);
    } else {
      res.status(500);
      // eslint-disable-next-line no-console
      console.error('get save search failed', response.error);
      res.end();
    }
  });
};
