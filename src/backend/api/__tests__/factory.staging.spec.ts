import { windowMockFetch } from 'mocks/window/mock-fetch';

import { BackendApiFactory } from '../factory';

describe('BackendApiFactory', () => {
  beforeAll(() => {
    process.env.ENVIRONMENT = 'staging';
  });
  afterAll(() => {
    process.env.ENVIRONMENT = 'production';
  });

  it('should use staging endpoints on staging', async () => {
    const fetchMock = windowMockFetch();

    const fetcher = BackendApiFactory({
      method: 'GET',
      url: 'testurl',
    });

    await fetcher({ locale: 'en' });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith('http://website-pf-local/en/api/testurl', {
      headers: {
        'x-forwarded-proto': 'https',
        Host: 'staging.propertyfinder.ae',
        locale: 'en',
        'user-agent': 'pf-web-app-74f9c3382b2516b2e826762e13dfa3ea05d84396',
        'x-akamai-device-characteristics': 'is_mobile=true&is_tablet=false',
      },
      method: 'GET',
    });
  });
});
