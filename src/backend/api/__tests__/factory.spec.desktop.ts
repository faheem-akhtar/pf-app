import { windowMockFetch } from 'mocks/window/mock-fetch';

import { BackendApiFactory } from '../factory';

describe('BackendApiFactory', () => {
  it('should add not add device characteristics header for desktop', async () => {
    const fetchMock = windowMockFetch();

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
        'user-agent': 'pf-web-app-74f9c3382b2516b2e826762e13dfa3ea05d84396',
      },
      method: 'GET',
    });
  });
});
