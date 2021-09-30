import { JwtTokenStore } from 'services/jwt/token/store';

export const jwtTokenStoreStub = (
  token: string = 'mocked token',
  refreshToken: string = 'mocked refresh token'
): JwtTokenStore => {
  return {
    getToken: () => token,
    getRefreshToken: () => refreshToken,
    setToken: jest.fn(),
    refreshToken: jest.fn(),
    setRefreshToken: jest.fn(),
  } as unknown as JwtTokenStore;
};
