import countHandler from 'pages/api/pwa/property-search/count';
import { mockNextApiRequest } from 'mocks/next-api/request.mock';
import { mockNextApiResponse } from 'mocks/next-api/response.mock';
import { mockWindowFetch } from 'mocks/window/fetch.mock';

describe('pages/api/property-search/count', () => {
  it('should return the count of properties for the search', async () => {
    mockWindowFetch({
      json: () => Promise.resolve({ data: { id: '0', attributes: { count: 5 } } }),
    });
    const reqMock = mockNextApiRequest();
    const resMock = mockNextApiResponse();
    await countHandler(reqMock, resMock);

    expect(resMock.send).toHaveBeenCalledTimes(1);
    expect(resMock.send).toHaveBeenCalledWith(5);
  });

  it('should return 500 if request fails', async () => {
    mockWindowFetch({ ok: false });
    const reqMock = mockNextApiRequest();
    const resMock = mockNextApiResponse();
    await countHandler(reqMock, resMock);

    expect(resMock.send).toHaveBeenCalledTimes(0);
    expect(resMock.end).toHaveBeenCalledTimes(1);
    expect(resMock.status).toHaveBeenCalledTimes(1);
    expect(resMock.status).toHaveBeenCalledWith(500);
  });
});
