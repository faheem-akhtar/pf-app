import * as isDevelopmentModule from 'helpers/is-development';
import { windowMockFetch } from 'mocks/window/mock-fetch';

(isDevelopmentModule as { helpersIsDevelopment: boolean })['helpersIsDevelopment'] = true;

import { BackendApiFactory } from '../factory';

describe('BackendApiFactory', () => {
  afterAll(() => {
    (isDevelopmentModule as { helpersIsDevelopment: boolean })['helpersIsDevelopment'] = false;
  });
  it('should use production endpoints in development', async () => {
    const fetchMock = windowMockFetch();

    const fetcher = BackendApiFactory({
      method: 'GET',
      url: 'testurl',
    });

    await fetcher({ locale: 'en' });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith('http://www.propertyfinder.ae/en/api/testurl', {
      headers: {
        'x-forwarded-proto': 'https',
        Host: 'www.propertyfinder.ae',
        locale: 'en',
        'user-agent': 'pf-web-app-74f9c3382b2516b2e826762e13dfa3ea05d84396',
        'x-akamai-device-characteristics': 'is_mobile=true&is_tablet=false',
      },
      method: 'GET',
    });
  });
});
