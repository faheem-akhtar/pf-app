import { NextApiRequest } from 'next';

import { ApiHeaderEnum } from 'enums/api/header.enum';

// TODO-FE[CX-409] add tests
export const backendApiGetLocaleFromReq = (req: NextApiRequest): string => {
  const locale = req.headers[ApiHeaderEnum.locale];

  if (!locale) {
    // eslint-disable-next-line no-console
    console.warn(`Locale is missing in request headers ${req.url}`);
  }

  return (locale || 'en') as string;
};
