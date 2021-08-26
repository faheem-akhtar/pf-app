import countHandler from 'pages/api/pwa/property-search/count';
import { nextApiMockRequest } from 'mocks/next-api/mock-request';
import { nextApiMockResponse } from 'mocks/next-api/mock-response';
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
    windowMockFetch({ ok: false });
    const reqMock = nextApiMockRequest();
    const resMock = nextApiMockResponse();
    await countHandler(reqMock, resMock);

    expect(resMock.send).toHaveBeenCalledTimes(0);
    expect(resMock.end).toHaveBeenCalledTimes(1);
    expect(resMock.status).toHaveBeenCalledTimes(1);
    expect(resMock.status).toHaveBeenCalledWith(500);
  });
});
