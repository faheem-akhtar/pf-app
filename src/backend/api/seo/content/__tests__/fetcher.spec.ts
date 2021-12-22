import { mockWindowFetch } from 'mocks/window/fetch.mock';
import { seoResponseContentStub } from 'stubs/seo/response-content.stub';

import { backendApiSeoContentFetcher } from '../fetcher';

describe('backendApiSeoContentFetcher', () => {
  it('should fetch the seo content', () => {
    const fetchMock = mockWindowFetch({ json: () => Promise.resolve(seoResponseContentStub()) });

    backendApiSeoContentFetcher('en', '/en/buy/dubai/villas-for-sale-dubai-hills-estate-dubai-hills.html');

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      'http://website-pf-local/en/api/seo/content?uri=%2Fen%2Fbuy%2Fdubai%2Fvillas-for-sale-dubai-hills-estate-dubai-hills.html',
      {
        headers: expect.objectContaining({
          locale: 'en',
        }),
        method: 'GET',
      }
    );
  });

  it('should handle the case of null', async () => {
    const fetchMock = mockWindowFetch({ json: () => Promise.resolve({ data: null }) });

    const response = await backendApiSeoContentFetcher(
      'en',
      '/en/buy/dubai/villas-for-sale-dubai-hills-estate-dubai-hills.html'
    );

    expect(response).toEqual(
      expect.objectContaining({
        ok: true,
        data: null,
      })
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
