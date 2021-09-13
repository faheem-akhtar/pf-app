import { mockWindowConsole } from 'mocks/window/console.mock';
import { mockWindowFetch } from 'mocks/window/fetch.mock';

import { ApiAuthRefreshTokenModelInterface } from 'api/auth/refresh-token/model.interface';
import { JwtTokenStore } from 'services/jwt/token/store';

describe('JwtTokenStore', () => {
  let store: JwtTokenStore;

  beforeEach(() => {
    mockWindowConsole();
    store = new JwtTokenStore();
    global.origin = 'test.origin';
  });

  describe('setToken', () => {
    it('should remove token', () => {
      store['windowLocalStorage'].removeItem = jest.fn();

      store.setToken();

      expect(store['windowLocalStorage'].removeItem).toHaveBeenCalledWith('user-authentication-token-v2');
      expect(store['token']).toBeNull();
    });

    it('should update tokent value token', () => {
      store['windowLocalStorage'].removeItem = jest.fn();
      store['windowLocalStorage'].setItem = jest.fn();

      store.setToken('some new token');

      expect(store['windowLocalStorage'].removeItem).toHaveBeenCalledWith('user-authentication-token-v2');
      expect(store['token']).toEqual('some new token');
      expect(store['windowLocalStorage'].setItem).toHaveBeenCalledWith(
        'user-authentication-token-v2',
        'some new token'
      );
    });
  });

  describe('getToken', () => {
    it('should return token', () => {
      store['token'] = null;
      expect(store.getToken()).toBeNull();
      store['token'] = 'some new token';
      expect(store.getToken()).toEqual('some new token');
    });
  });

  describe('refreshToken', () => {
    it('should return existing refresh token', () => {
      store['refreshTokenPromise'] = Promise.resolve('refreshTokenPromise');
      expect(store.refreshToken()).toEqual(Promise.resolve('refreshTokenPromise'));
    });

    it('should return null if token doesnt exist', () => {
      store['refreshTokenPromise'] = null;
      store['getToken'] = jest.fn().mockReturnValue(null);
      expect(store.refreshToken()).toEqual(Promise.resolve(null));
    });

    it('should return reset token in reset token doesnt exist', () => {
      store['refreshTokenPromise'] = null;
      store['getToken'] = jest.fn().mockReturnValue('token');
      store['getRefreshToken'] = jest.fn().mockReturnValue(null);
      expect(store.refreshToken()).toEqual(Promise.resolve(null));
      expect(store['token']).toBeNull();
    });

    it('should refresh token', async () => {
      const fetchMock = mockWindowFetch({
        ok: true,
        status: 200,
        json: (): Promise<ApiAuthRefreshTokenModelInterface> =>
          Promise.resolve({
            data: {
              attributes: {
                payload: 'new token',
                refresh_token: 'new refresh token',
              },
            },
          }),
      });
      store['refreshTokenPromise'] = null;
      store['getToken'] = jest.fn().mockReturnValue('token');
      store['setToken'] = jest.fn();
      store['setRefreshToken'] = jest.fn();
      store['getRefreshToken'] = jest.fn().mockReturnValue('refresh token');

      await store.refreshToken();

      expect(fetchMock).toHaveBeenCalled();
      expect(store['setToken']).toHaveBeenCalledWith('new token');
      expect(store['setRefreshToken']).toHaveBeenCalledWith('new refresh token');
    });

    it('should reset token if requst failed token', async () => {
      const fetchMock = mockWindowFetch({
        ok: false,
        status: 500,
        json: (): Promise<{}> => Promise.resolve({}),
      });
      store['refreshTokenPromise'] = null;
      store['getToken'] = jest.fn().mockReturnValue('token');
      store['setToken'] = jest.fn();
      store['setRefreshToken'] = jest.fn();
      store['getRefreshToken'] = jest.fn().mockReturnValue('refresh token');

      await store.refreshToken();

      expect(fetchMock).toHaveBeenCalled();
      expect(store['setToken']).toHaveBeenCalled();
      expect(store['setRefreshToken']).not.toHaveBeenCalled();
    });
  });

  describe('setRefreshToken', () => {
    it('should remove refresh token', () => {
      store['windowLocalStorage'].removeItem = jest.fn();

      store.setRefreshToken();

      expect(store['windowLocalStorage'].removeItem).toHaveBeenCalledWith('user-refresh-token-v2');
    });

    it('should update refresh token value', () => {
      store['windowLocalStorage'].removeItem = jest.fn();
      store['windowLocalStorage'].setItem = jest.fn();

      store.setRefreshToken('some new refresh token');

      expect(store['windowLocalStorage'].removeItem).toHaveBeenCalledWith('user-refresh-token-v2');
      expect(store['windowLocalStorage'].setItem).toHaveBeenCalledWith(
        'user-refresh-token-v2',
        'some new refresh token'
      );
    });
  });

  describe('getRefreshToken', () => {
    it('should return null', () => {
      store['windowLocalStorage'].getItem = jest.fn().mockReturnValue(null);

      expect(store.getRefreshToken()).toBeNull();
    });

    it('should return refresh token value', () => {
      store['windowLocalStorage'].getItem = jest.fn().mockReturnValue('token');

      store.setRefreshToken('some new refresh token');

      expect(store.getRefreshToken()).toEqual('token');
    });
  });
});
