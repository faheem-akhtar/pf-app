import { mockWindowFetch } from 'mocks/window/fetch.mock';
import { filtersValueStub } from 'stubs/filters/value/stub';
import { propertiesRawBackendStub } from 'stubs/properties/raw-backend.stub';

import { backendApiPropertySearchFetcher } from '../fetcher';

describe('backendApiPropertySearchFetcher', () => {
  it('should fetch the ads', async () => {
    const fetchMock = mockWindowFetch({ json: () => Promise.resolve(propertiesRawBackendStub()) });

    await backendApiPropertySearchFetcher('en', filtersValueStub(), 'abc', 'user agent');

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringMatching(new RegExp('http:\\/\\/website-pf-local\\/en\\/api\\/search\\?(.+)')),
      {
        headers: expect.objectContaining({
          locale: 'en',
          cookie: 'website_ab_tests=abc',
          'user-agent': 'user agent',
        }),
        method: 'GET',
      }
    );
    expect(fetchMock).toHaveBeenCalledWith(
      expect.not.stringMatching(
        new RegExp('http:\\/\\/website-pf-local\\/en\\/api\\/search\\?(.+)&break_thru_cache=0\\.2')
      ),
      expect.any(Object)
    );

    expect(fetchMock).toHaveBeenCalledWith(expect.not.stringMatching(/(\bsmart_ads\b|\bcts\b)/), expect.any(Object));
  });
});
