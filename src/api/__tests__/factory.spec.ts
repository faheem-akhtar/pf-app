import { ApiFactory } from 'api/factory';
import { mockFetch } from 'mocks/mock/fetch';

describe('ApiFactory', () => {
  it('should use origin from window', async () => {
    const fetchMock = mockFetch();
    global.origin = 'test.origin';
    const fetcher = ApiFactory({
      method: 'GET',
      url: 'testurl',
    });

    await fetcher({ locale: 'en' });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith('test.origin/en/api/testurl', { headers: { locale: 'en' }, method: 'GET' });
  });
});
