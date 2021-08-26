import { ApiHeaderEnum } from 'enums/api/header.enum';
import { NextApiRequest } from 'next';

export const nextApiMockRequest = (): NextApiRequest => {
  return {
    query: {},
    headers: {
      [ApiHeaderEnum.locale as string]: 'en',
    },
  } as NextApiRequest;
};
