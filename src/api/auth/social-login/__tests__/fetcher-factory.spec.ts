import { ApiFactory } from 'api/factory';

import { ApiAuthSocialLoginFetcherFactory } from '../fetcher-factory';

jest.mock('api/factory');

describe('ApiAuthSocialLoginFetcherFactory', () => {
  it('should call api factory', async () => {
    await ApiAuthSocialLoginFetcherFactory({ url: 'my url' });

    expect(ApiFactory).toHaveBeenCalledTimes(1);
    expect(ApiFactory).toHaveBeenCalledWith({
      method: 'POST',
      url: 'my url',
      alterHeaders: expect.any(Function),
      dataMapper: expect.any(Function),
    });
  });
});
