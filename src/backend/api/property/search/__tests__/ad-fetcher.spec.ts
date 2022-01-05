import { mockWindowFetch } from 'mocks/window/fetch.mock';
import { filtersValueStub } from 'stubs/filters/value/stub';
import { propertiesRawBackendStub } from 'stubs/properties/raw-backend.stub';

import { backendApiPropertySearchAdFetcher } from '../ad-fetcher';

describe('backendApiPropertySearchAdFetcher', () => {
  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchMock = mockWindowFetch({ json: () => Promise.resolve(propertiesRawBackendStub()) });
  });

  it('should fetch the ads', async () => {
    await backendApiPropertySearchAdFetcher('en', filtersValueStub(), 'abc', 'user agent');

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringMatching(
        new RegExp('http:\\/\\/website-pf-local\\/en\\/api\\/search\\?(.+)&break_thru_cache=0\\.2')
      ),
      {
        headers: expect.objectContaining({
          locale: 'en',
          cookie: 'website_ab_tests=abc',
          'user-agent': 'user agent',
        }),
        method: 'GET',
      }
    );
  });

  it('should request for smart_ads and cts', async () => {
    await backendApiPropertySearchAdFetcher('en', filtersValueStub(), 'abc', 'user agent');

    expect(fetchMock).toHaveBeenCalledWith(expect.stringMatching(/(\bsmart_ads\b|\bcts\b)/), expect.any(Object));
  });

  it('should request for only 3 records', async () => {
    await backendApiPropertySearchAdFetcher('en', filtersValueStub(), 'abc', 'user agent');

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringMatching(new RegExp(encodeURI('page[limit]=3'))),
      expect.any(Object)
    );
  });
});
