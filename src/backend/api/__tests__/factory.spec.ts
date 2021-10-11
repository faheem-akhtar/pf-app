import { mockWindowFetch } from 'mocks/window/fetch.mock';

import { BackendApiFactory } from '../factory';

describe('BackendApiFactory', () => {
  it('should add user agend and akamai device characteristics headers', async () => {
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
        'x-akamai-device-characteristics': 'is_mobile=true&is_tablet=false',
      },
      method: 'GET',
    });
  });

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
        'x-akamai-device-characteristics': 'is_mobile=true&is_tablet=false',
      },
      method: 'GET',
    });
  });
});
