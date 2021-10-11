import { mockWindowFetch } from 'mocks/window/fetch.mock';

import { BackendApiFactory } from '../factory';

describe('BackendApiFactory', () => {
  it('should add not add device characteristics header for desktop', async () => {
    const fetchMock = mockWindowFetch();

    const fetcher = BackendApiFactory({
      method: 'GET',
      url: 'testurl',
    });

    await fetcher({ locale: 'en' });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith('http://website-pf-local/en/api/testurl', {
      headers: {
        Host: 'www.propertyfinder.ae',
        locale: 'en',
        'x-forwarded-proto': 'https',
      },
      method: 'GET',
    });
  });
});
