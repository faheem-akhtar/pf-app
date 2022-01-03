import { mockWindowFetch } from 'mocks/window/fetch.mock';
import { locationSlugHistoryBackendStub } from 'stubs/location/slug-history-backend.stub';

import { backendApiLocationSlugHistoryFetcher } from '../fetcher';

describe('backendApiLocationSlugHistoryFetcher', () => {
  it('should fetch the location slug history', async () => {
    const fetchMock = mockWindowFetch({ json: () => Promise.resolve({ data: [locationSlugHistoryBackendStub()] }) });

    await backendApiLocationSlugHistoryFetcher({ locale: 'en' })({ locale: 'en' });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      'http://website-pf-local/en/api/location-slug-history?filter%5Bprimary_language%5D=true',
      {
        headers: expect.objectContaining({
          locale: 'en',
        }),
        method: 'GET',
      }
    );
  });
});
