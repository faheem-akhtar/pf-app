import { NextApiRequest } from 'next';

import { ApiHeaderEnum } from 'enums/api/header.enum';

export const nextApiRequestStub = (): NextApiRequest => {
  return {
    query: {},
    headers: {
      [ApiHeaderEnum.locale as string]: 'en',
    },
    cookies: {},
  } as NextApiRequest;
};
