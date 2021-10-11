import { mockWindowFetch } from 'mocks/window/fetch.mock';

import { BackendApiFactory } from '../factory';

describe('BackendApiFactory', () => {
  beforeAll(() => {
    process.env.ENVIRONMENT = 'staging';
  });
  afterAll(() => {
    process.env.ENVIRONMENT = 'production';
  });

  it('should use staging endpoints on staging', async () => {
    const fetchMock = mockWindowFetch();

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
        'x-akamai-device-characteristics': 'is_mobile=true&is_tablet=false',
      },
      method: 'GET',
    });
  });
});
