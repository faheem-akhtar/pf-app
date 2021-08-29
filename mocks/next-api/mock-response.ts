import { NextApiResponse } from 'next';

export const nextApiMockResponse = (): NextApiResponse => {
  return {
    send: jest.fn() as NextApiResponse['send'],
    status: jest.fn() as NextApiResponse['status'],
    end: jest.fn() as NextApiResponse['end'],
  } as NextApiResponse;
};