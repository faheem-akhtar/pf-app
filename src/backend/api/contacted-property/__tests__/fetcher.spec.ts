import { mockWindowFetch } from 'mocks/window/fetch.mock';

import { backendApiContactedPropertyFetcher } from '../fetcher';

describe('backendApiContactedPropertyFetcher', () => {
  it('should use backend api factory to send request', async () => {
    const factoryMock = mockWindowFetch();
    await backendApiContactedPropertyFetcher()({ locale: 'en', getOrigin: () => 'test.origin' });

    expect(factoryMock).toHaveBeenCalledTimes(1);
    expect(factoryMock).toHaveBeenCalledWith(
      expect.stringContaining('test.origin/en/api/user/contacted-property'),
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
    await backendApiContactedPropertyFetcher('POST')({ locale: 'en', getOrigin: () => 'test.origin' });

    expect(factoryMock).toHaveBeenCalledTimes(1);
    expect(factoryMock).toHaveBeenCalledWith(
      expect.stringContaining('test.origin/en/api/user/contacted-property'),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          locale: 'en',
        }),
      })
    );
  });
});
