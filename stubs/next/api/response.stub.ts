import { NextApiResponse } from 'next';

export const nextApiResponseStub = (): NextApiResponse => {
  return {
    send: jest.fn() as NextApiResponse['send'],
    status: jest.fn() as NextApiResponse['status'],
    end: jest.fn() as NextApiResponse['end'],
    setHeader: jest.fn() as NextApiResponse['setHeader'],
  } as NextApiResponse;
};
