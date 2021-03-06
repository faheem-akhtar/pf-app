import { mockWindowFetch } from 'mocks/window/fetch.mock';

import { ApiFactory } from 'api/factory';

describe('ApiFactory', () => {
  it('should use origin from window', async () => {
    const fetchMock = mockWindowFetch();
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
