import { mockWindowFetch } from 'mocks/window/fetch.mock';

import { AuthLogoutService } from 'services/auth/logout.service';
import { AuthService } from 'services/auth/service';
import { JwtTokenService } from 'services/jwt/token/service';

describe('AuthLogoutService', () => {
  beforeEach(() => {
    global.origin = 'test.origin';
  });

  it('should clean user data', async () => {
    mockWindowFetch();
    const setTokenSpy = jest.spyOn(JwtTokenService, 'setToken');
    const setRefreshTokenSpy = jest.spyOn(JwtTokenService, 'setRefreshToken');
    AuthService['signOut'] = jest.fn();

    await AuthLogoutService();

    expect(setTokenSpy).toBeCalled();
    expect(setRefreshTokenSpy).toBeCalled();
    expect(AuthService['signOut']).toBeCalled();
  });
});
