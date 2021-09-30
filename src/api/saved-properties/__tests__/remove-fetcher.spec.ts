import { mockWindowFetch } from 'mocks/window/fetch.mock';
import { jwtTokenStoreStub } from 'stubs/jwt/token/store.stub';

import { apiSavedPropertiesRemoveFetcher } from '../remove-fetcher';

jest.mock('services/jwt/token/store', () => ({
  JwtTokenStore: jest.fn().mockImplementation(() => jwtTokenStoreStub()),
}));

describe('apiSavedPropertiesRemoveFetcher', () => {
  it('should send a delete request', async () => {
    const factoryMock = mockWindowFetch();

    await apiSavedPropertiesRemoveFetcher({
      propertyId: 1,
    });

    expect(factoryMock).toHaveBeenCalledTimes(1);
    expect(factoryMock).toHaveBeenCalledWith('default-origin/en/api/pwa/saved-property/1', {
      method: 'DELETE',
      headers: {
        locale: 'en',
        'x-pf-jwt': 'Bearer mocked token',
      },
    });
  });
});
