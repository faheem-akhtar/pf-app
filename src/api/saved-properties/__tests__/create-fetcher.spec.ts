import { mockWindowFetch } from 'mocks/window/fetch.mock';

import { JwtTokenStore } from 'services/jwt/token/store';

import { apiSavedPropertiesCreateFetcher } from '../create-fetcher';

jest.mock('services/jwt/token/store');

describe('apiSavedPropertiesCreateFetcher', () => {
  beforeEach(() => {
    global.origin = 'test.origin';
    ((JwtTokenStore as jest.Mock).mock.instances[0].getToken as jest.Mock).mockReturnValue('my token');
  });

  it('should send a post request', async () => {
    const factoryMock = mockWindowFetch();

    await apiSavedPropertiesCreateFetcher({
      propertyId: 1,
      saveDate: '2021-09-14',
    });

    expect(factoryMock).toHaveBeenCalledTimes(1);
    expect(factoryMock).toHaveBeenCalledWith(
      'test.origin/en/api/pwa/saved-property',
      expect.objectContaining({
        method: 'POST',
        headers: {
          locale: 'en',
          'content-type': 'application/vnd.api+json',
          'x-pf-jwt': 'Bearer my token',
        },
        body: JSON.stringify({
          data: {
            type: 'saved_property',
            attributes: {
              property_id: 1,
              save_date: '2021-09-14',
            },
          },
        }),
      })
    );
  });
});
