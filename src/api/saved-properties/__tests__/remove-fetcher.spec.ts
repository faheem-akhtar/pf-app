import { mockWindowFetch } from 'mocks/window/fetch.mock';

import { JwtTokenStore } from 'services/jwt/token/store';

import { apiSavedPropertiesRemoveFetcher } from '../remove-fetcher';

jest.mock('services/jwt/token/store');

describe('apiSavedPropertiesRemoveFetcher', () => {
  beforeEach(() => {
    global.origin = 'test.origin';
    ((JwtTokenStore as jest.Mock).mock.instances[0].getToken as jest.Mock).mockReturnValue('my token');
  });

  it('should send a delete request', async () => {
    const factoryMock = mockWindowFetch();

    await apiSavedPropertiesRemoveFetcher({
      propertyId: '1',
    });

    expect(factoryMock).toHaveBeenCalledTimes(1);
    expect(factoryMock).toHaveBeenCalledWith('test.origin/en/api/pwa/saved-property/1', {
      method: 'DELETE',
      headers: {
        locale: 'en',
        'x-pf-jwt': 'Bearer my token',
      },
    });
  });
});
