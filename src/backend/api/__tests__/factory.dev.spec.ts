import { mockWindowFetch } from 'mocks/window/fetch.mock';

import * as isDevelopmentModule from 'helpers/is-development';

(isDevelopmentModule as { helpersIsDevelopment: boolean })['helpersIsDevelopment'] = true;

import { BackendApiFactory } from '../factory';

describe('BackendApiFactory', () => {
  afterAll(() => {
    (isDevelopmentModule as { helpersIsDevelopment: boolean })['helpersIsDevelopment'] = false;
  });
  it('should use production endpoints in development', async () => {
    const fetchMock = mockWindowFetch();

    const fetcher = BackendApiFactory({
      method: 'GET',
      url: 'testurl',
    });

    await fetcher({ locale: 'en' });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith('http://www.propertyfinder.ae/en/api/testurl', {
      headers: {
        locale: 'en',
        'x-akamai-device-characteristics': 'is_mobile=true&is_tablet=false',
      },
      method: 'GET',
    });
  });
});
