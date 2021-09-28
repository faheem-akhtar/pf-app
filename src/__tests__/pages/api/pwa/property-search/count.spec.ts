import { mockWindowConsole } from 'mocks/window/console.mock';
import { mockWindowFetch } from 'mocks/window/fetch.mock';
import { nextApiRequestStub, nextApiResponseStub } from 'stubs/next/api';

import countHandler from 'pages/api/pwa/property-search/count';

describe('pages/api/property-search/count', () => {
  it('should return the count of properties for the search', async () => {
    mockWindowFetch({
      json: () => Promise.resolve({ data: { id: '0', attributes: { count: 5 } } }),
    });
    const reqMock = nextApiRequestStub();
    const resMock = nextApiResponseStub();
    await countHandler(reqMock, resMock);

    expect(resMock.send).toHaveBeenCalledTimes(1);
    expect(resMock.send).toHaveBeenCalledWith(5);
  });

  it('should return 500 if request fails', async () => {
    const consoleMock = mockWindowConsole();
    mockWindowFetch({ ok: false });
    const reqMock = nextApiRequestStub();
    const resMock = nextApiResponseStub();
    await countHandler(reqMock, resMock);

    expect(resMock.send).toHaveBeenCalledTimes(0);
    expect(resMock.end).toHaveBeenCalledTimes(1);
    expect(resMock.status).toHaveBeenCalledTimes(1);
    expect(resMock.status).toHaveBeenCalledWith(500);
    expect(consoleMock.error).toHaveBeenCalledWith(
      expect.objectContaining({
        body: 'response.text',
        payload: {
          headers: {
            Host: 'www.propertyfinder.ae',
            locale: 'en',
            'user-agent': 'pf-web-app-74f9c3382b2516b2e826762e13dfa3ea05d84396',
            'x-akamai-device-characteristics': 'is_mobile=true&is_tablet=false',
            'x-forwarded-proto': 'https',
          },
          method: 'GET',
        },
        status: 200,
      }),
      'property search count failed'
    );
  });
});
