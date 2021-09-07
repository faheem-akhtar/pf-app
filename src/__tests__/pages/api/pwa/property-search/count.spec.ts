import countHandler from 'pages/api/pwa/property-search/count';
import { nextApiMockRequest } from 'mocks/next-api/mock-request';
import { nextApiMockResponse } from 'mocks/next-api/mock-response';
import { windowMockConsole } from 'mocks/window/mock-console';
import { windowMockFetch } from 'mocks/window/mock-fetch';

describe('pages/api/property-search/count', () => {
  it('should return the count of properties for the search', async () => {
    windowMockFetch({
      json: () => Promise.resolve({ data: { id: '0', attributes: { count: 5 } } }),
    });
    const reqMock = nextApiMockRequest();
    const resMock = nextApiMockResponse();
    await countHandler(reqMock, resMock);

    expect(resMock.send).toHaveBeenCalledTimes(1);
    expect(resMock.send).toHaveBeenCalledWith(5);
  });

  it('should return 500 if request fails', async () => {
    const consoleMock = windowMockConsole();
    windowMockFetch({ ok: false });
    const reqMock = nextApiMockRequest();
    const resMock = nextApiMockResponse();
    await countHandler(reqMock, resMock);

    expect(resMock.send).toHaveBeenCalledTimes(0);
    expect(resMock.end).toHaveBeenCalledTimes(1);
    expect(resMock.status).toHaveBeenCalledTimes(1);
    expect(resMock.status).toHaveBeenCalledWith(500);
    expect(consoleMock.error).toHaveBeenCalledWith('property search count failed', {
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
      url: 'http://website-pf-local/en/api/search/count?filter%5Bcategory_id%5D=2&filter%5Bprice_type%5D=y&sort=mr&page%5Bnumber%5D=1',
    });
  });
});
