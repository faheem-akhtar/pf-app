import { mockWindowFetch } from 'mocks/window/fetch.mock';

import { backendApiSaveSearchFetcher } from '../fetcher';

describe('backendApiSaveSearchFetcher', () => {
  it('should use backend api factory to send request', async () => {
    const factoryMock = mockWindowFetch();
    await backendApiSaveSearchFetcher()({ locale: 'en', getOrigin: () => 'test.origin' });

    expect(factoryMock).toHaveBeenCalledTimes(1);
    expect(factoryMock).toHaveBeenCalledWith(
      expect.stringContaining('test.origin/en/api/saved-search'),
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          locale: 'en',
        }),
      })
    );
  });

  it('should accept POST method', async () => {
    const factoryMock = mockWindowFetch();
    await backendApiSaveSearchFetcher('POST')({ locale: 'en', getOrigin: () => 'test.origin' });

    expect(factoryMock).toHaveBeenCalledTimes(1);
    expect(factoryMock).toHaveBeenCalledWith(
      expect.stringContaining('test.origin/en/api/saved-search'),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          locale: 'en',
        }),
      })
    );
  });
});
