import { ApiHeaderEnum } from 'enums/api/header.enum';
import { NextApiRequest } from 'next';

export const nextApiRequestStub = (): NextApiRequest => {
  return {
    query: {},
    headers: {
      [ApiHeaderEnum.locale as string]: 'en',
    },
  } as NextApiRequest;
};
