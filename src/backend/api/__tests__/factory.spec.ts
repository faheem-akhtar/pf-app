import { windowMockFetch } from 'mocks/window/mock-fetch';

import { BackendApiFactory } from '../factory';

describe('BackendApiFactory', () => {
  it('should add user agend and akamai device characteristics headers', async () => {
    const fetchMock = windowMockFetch();

    const fetcher = BackendApiFactory({
      method: 'GET',
      url: 'testurl',
    });

    await fetcher({ locale: 'en' });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith('https://www.propertyfinder.ae/en/api/testurl', {
      headers: {
        locale: 'en',
        'user-agent': 'pf-web-app-74f9c3382b2516b2e826762e13dfa3ea05d84396',
        'x-akamai-device-characteristics': 'is_mobile=true&is_tablet=false',
      },
      method: 'GET',
    });
  });
});
