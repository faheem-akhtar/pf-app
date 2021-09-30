import { mockWindowFetch } from 'mocks/window/fetch.mock';
import { jwtTokenStoreStub } from 'stubs/jwt/token/store.stub';

import { apiSavedPropertiesCreateFetcher } from '../create-fetcher';

jest.mock('services/jwt/token/store', () => ({
  JwtTokenStore: jest.fn().mockImplementation(() => jwtTokenStoreStub()),
}));

describe('apiSavedPropertiesCreateFetcher', () => {
  it('should send a post request', async () => {
    const factoryMock = mockWindowFetch();

    await apiSavedPropertiesCreateFetcher({
      propertyId: 1,
      saveDate: '2021-09-14',
    });

    expect(factoryMock).toHaveBeenCalledTimes(1);
    expect(factoryMock).toHaveBeenCalledWith(
      'default-origin/en/api/pwa/saved-property',
      expect.objectContaining({
        method: 'POST',
        headers: {
          locale: 'en',
          'content-type': 'application/vnd.api+json',
          'x-pf-jwt': 'Bearer mocked token',
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
