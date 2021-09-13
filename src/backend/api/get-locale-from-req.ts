import { NextApiRequest } from 'next';

import { ApiHeaderEnum } from 'enums/api/header.enum';

// TODO-FE[CX-409] add tests
export const backendApiGetLocaleFromReq = (req: NextApiRequest): string => {
  const locale = req.headers[ApiHeaderEnum.locale];

  if (!locale) {
    throw new Error('Locale is missing in request headers');
  }

  return locale as string;
};
