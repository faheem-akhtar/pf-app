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
    mockWindowFetch({ ok: false, status: 500 });
    const reqMock = nextApiRequestStub();
    const resMock = nextApiResponseStub();
    await countHandler(reqMock, resMock);

    expect(resMock.send).toHaveBeenCalledTimes(0);
    expect(resMock.end).toHaveBeenCalledTimes(1);
    expect(resMock.status).toHaveBeenCalledTimes(1);
    expect(resMock.status).toHaveBeenCalledWith(500);
    expect((consoleMock.error as jest.Mock).mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          "FETCH_ERROR:500:GET:http://website-pf-local/en/api/search/count?filter%5Bcategory_id%5D=2&filter%5Bfurnished%5D=0&filter%5Bprice_type%5D=y&sort=mr&page%5Bnumber%5D=1:Internal Server Error",
        ],
        Array [
          "API_FAILED:PROPERTY_SEARCH_COUNT:Internal Server Error",
        ],
      ]
    `);
  });
});
