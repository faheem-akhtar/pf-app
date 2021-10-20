import { NextApiRequest } from 'next';

import { mockWindowConsole } from 'mocks/window/console.mock';
import { mockWindowFetch } from 'mocks/window/fetch.mock';
import { nextApiRequestStub, nextApiResponseStub } from 'stubs/next/api';
import { propertiesRawBackendStub } from 'stubs/properties/raw-backend.stub';

import statsDataHandler from 'pages/api/pwa/property-search/stats-data';

describe('property stats-data api handler', () => {
  it('should should send obfuscated stats model', async () => {
    mockWindowFetch({
      json: () => Promise.resolve(propertiesRawBackendStub()),
    });
    const reqMock = {
      ...nextApiRequestStub(),
      query: { pageNumber: 2, ['propertiesIds[]']: ['1', '2'] },
    } as unknown as NextApiRequest;
    const resMock = nextApiResponseStub();
    await statsDataHandler(reqMock, resMock);

    expect(resMock.send).toHaveBeenCalledTimes(1);
    expect(resMock.send).toHaveBeenCalledWith({
      properties: [
        expect.objectContaining({
          '006501075e65': 61.19,
        }),
      ],
    });
  });

  it('should return 500 if request fails', async () => {
    mockWindowFetch({
      json: () => Promise.resolve(propertiesRawBackendStub()),
    });
    const consoleMock = mockWindowConsole();
    mockWindowFetch({ ok: false, status: 500 });
    const reqMock = {
      ...nextApiRequestStub(),
      query: { pageNumber: 2, ['propertiesIds[]']: ['1', '2'] },
    } as unknown as NextApiRequest;
    const resMock = nextApiResponseStub();
    await statsDataHandler(reqMock, resMock);

    expect(resMock.send).toHaveBeenCalledTimes(0);
    expect(resMock.end).toHaveBeenCalledTimes(1);
    expect(resMock.status).toHaveBeenCalledTimes(1);
    expect(resMock.status).toHaveBeenCalledWith(500);
    expect(consoleMock.error).toHaveBeenCalledWith('property search stats data failed', expect.anything());
  });
});
