import { mockWindowFetch } from 'mocks/window/fetch.mock';
import { mockWindowStorage } from 'mocks/window/storage.mock';

import { AuthGoogleOneTapService } from 'services/auth/google-one-tap.service';
import { JwtTokenService } from 'services/jwt/token/service';
import { UserModelInterface } from 'services/user/model.interface';
import { WindowService } from 'services/window/service';
import { WindowStorageInterface } from 'services/window/storage/interface';

import { AuthModelInterface } from '../model.interface';
import { AuthStore } from '../store';
import { AuthSubscribeEventTypeEnum } from '../subscribe-event-type.enum';

jest.mock('services/jwt/token/service');

describe('AuthStore', () => {
  let store: AuthStore;
  let signInSpy: jest.SpyInstance;
  let localStorageMock: WindowStorageInterface;

  const userMock: UserModelInterface = {
    email: 'email@example.com',
    first_name: 'first name',
    last_name: 'last name',
    userId: '1',
    image: '',
  };

  beforeEach(() => {
    signInSpy = jest.spyOn(AuthGoogleOneTapService, 'signIn');

    localStorageMock = mockWindowStorage();

    WindowService.localStorage = localStorageMock;

    store = new AuthStore();
  });

  describe('constructor()', () => {
    it('should initialise the object', () => {
      expect(store['jwtTokenService']).not.toBeUndefined();
      expect(store['windowLocalStorage']).not.toBeUndefined();

      expect(signInSpy).toBeCalledTimes(1);
    });

    it('should not call signIn if user is already there', () => {
      signInSpy.mockReset();
      localStorageMock = mockWindowStorage(userMock);
      WindowService.localStorage = localStorageMock;

      store = new AuthStore();

      expect(signInSpy).not.toHaveBeenCalled();
    });
  });

  describe('updateUserData()', () => {
    it('should update user information', () => {
      const updateMock = jest.fn();
      store['subscribers'] = [updateMock];

      store['updateUserData'](userMock);

      expect(updateMock).toHaveBeenCalledTimes(1);
      expect(updateMock).toHaveBeenCalledWith(userMock, undefined);
    });

    it('should accept event type', () => {
      const updateMock = jest.fn();
      store['subscribers'] = [updateMock];

      store['updateUserData'](userMock, AuthSubscribeEventTypeEnum.register);

      expect(updateMock).toHaveBeenCalledTimes(1);
      expect(updateMock).toHaveBeenCalledWith(userMock, { eventType: 'register' });
    });
  });

  describe('subscribe()', () => {
    it('should able subscription to the updates', () => {
      const onUpdateMock = jest.fn();
      expect(store['subscribers']).toEqual([]);

      store.subscribe(onUpdateMock);

      expect(store['subscribers']).toEqual([onUpdateMock]);
    });

    it('should be able to filter the subscribers', () => {
      const onUpdateMock1 = jest.fn();
      const onUpdateMock2 = jest.fn();
      store['subscribers'] = [onUpdateMock1];

      const filter = store.subscribe(onUpdateMock2);

      expect(store['subscribers']).toEqual([onUpdateMock1, onUpdateMock2]);

      filter();

      expect(store['subscribers']).toEqual([onUpdateMock1]);
    });
  });

  describe('logOut()', () => {
    beforeEach(() => {
      mockWindowFetch();
    });
    it('should remove token', async () => {
      await store.logOut();

      expect(JwtTokenService.setToken).toHaveBeenCalledTimes(1);
      expect(JwtTokenService.setToken).toHaveBeenCalledWith();

      expect(JwtTokenService.setRefreshToken).toHaveBeenCalledTimes(1);
      expect(JwtTokenService.setRefreshToken).toHaveBeenCalledWith();
    });

    it('should sign out', async () => {
      localStorageMock = mockWindowStorage(userMock);
      WindowService.localStorage = localStorageMock;
      store = new AuthStore();

      (store['windowLocalStorage'].setItem as jest.Mock).mockClear();
      (store['windowLocalStorage'].removeItem as jest.Mock).mockClear();

      await store.logOut();

      expect(store['windowLocalStorage'].removeItem).toHaveBeenCalledTimes(1);
      expect(store['windowLocalStorage'].removeItem).toHaveBeenCalledWith('user-authentication-user');

      expect(store['windowLocalStorage'].setItem).not.toHaveBeenCalled();
    });
  });

  describe('getUser()', () => {
    it('should return null if data is not there', () => {
      localStorageMock = mockWindowStorage();
      WindowService.localStorage = localStorageMock;
      store = new AuthStore();

      expect(store.getUser()).toBeNull();
    });

    it('should return null if data is not an object', () => {
      localStorageMock = mockWindowStorage('not an object');
      WindowService.localStorage = localStorageMock;
      store = new AuthStore();

      expect(store.getUser()).toBeNull();
    });

    it('should return the user', () => {
      localStorageMock = mockWindowStorage(userMock);
      WindowService.localStorage = localStorageMock;
      store = new AuthStore();

      expect(store.getUser()).toEqual(userMock);
    });
  });

  describe('onAuthResolved()', () => {
    let data: AuthModelInterface;

    beforeEach(() => {
      (JwtTokenService.setRefreshToken as jest.Mock).mockClear();
      (JwtTokenService.setToken as jest.Mock).mockClear();
      (store['windowLocalStorage'].setItem as jest.Mock).mockClear();
      (store['windowLocalStorage'].removeItem as jest.Mock).mockClear();

      data = {
        user: userMock,
        meta: {
          token: 'my token',
          refresh_token: 'refresh token',
        },
      };
    });

    it('should update data', () => {
      store.onAuthResolved(data, AuthSubscribeEventTypeEnum.login);

      expect(JwtTokenService.setRefreshToken).toHaveBeenCalledTimes(1);
      expect(JwtTokenService.setRefreshToken).toHaveBeenCalledWith('refresh token');
      expect(JwtTokenService.setToken).toHaveBeenCalledTimes(1);
      expect(JwtTokenService.setToken).toHaveBeenCalledWith('my token');
    });

    it('should update user data in local storage', () => {
      const updateMock = jest.fn();
      store['subscribers'] = [updateMock];

      store.onAuthResolved(data, AuthSubscribeEventTypeEnum.login);

      expect(store['windowLocalStorage'].removeItem).not.toHaveBeenCalled();
      expect(store['windowLocalStorage'].setItem).toHaveBeenCalledTimes(1);
      expect(store['windowLocalStorage'].setItem).toHaveBeenCalledWith(
        'user-authentication-user',
        JSON.stringify({
          id: userMock.userId,
          first_name: userMock.first_name,
          last_name: userMock.last_name,
          image: userMock.image,
          email: userMock.email,
        })
      );

      expect(updateMock).toHaveBeenCalledTimes(1);
      expect(updateMock).toHaveBeenCalledWith(userMock, { eventType: 'login' });
    });
  });

  describe('onLoginRejected()', () => {
    it('should handle error', () => {
      expect(
        store.onLoginRejected({
          ok: false,
          headers: {} as Headers,
          error: { status: 404, body: 'the error body', url: '' },
        })
      ).toEqual({ ok: false, headers: {} as Headers, error: { status: 404, body: '', url: '' } });
    });

    it('should handle 401 error', () => {
      expect(
        store.onLoginRejected({
          ok: false,
          headers: {} as Headers,
          error: { status: 401, body: '{"errors": [{ "detail": "this is an error" }]}', url: '' },
        })
      ).toEqual({ ok: false, headers: {} as Headers, error: { status: 401, body: 'this is an error', url: '' } });
    });
  });

  describe('onAuthRejected()', () => {
    it('should handle error', () => {
      expect(
        store.onAuthRejected({
          ok: false,
          headers: {} as Headers,
          error: { status: 404, body: 'the error body', url: '' },
        })
      ).toEqual({ ok: false, headers: {} as Headers, error: { status: 404, body: '', url: '' } });
    });

    it('should handle 400 error', () => {
      expect(
        store.onAuthRejected({
          ok: false,
          headers: {} as Headers,
          error: { status: 400, body: '{"errors": [{ "detail": "this is an error 400" }]}', url: '' },
        })
      ).toEqual({ ok: false, headers: {} as Headers, error: { status: 400, body: 'this is an error 400', url: '' } });
    });

    it('should handle 422 error', () => {
      expect(
        store.onAuthRejected({
          ok: false,
          headers: {} as Headers,
          error: { status: 422, body: '{"errors": [{ "detail": "this is an error 422" }]}', url: '' },
        })
      ).toEqual({ ok: false, headers: {} as Headers, error: { status: 422, body: 'this is an error 422', url: '' } });
    });
  });

  describe('resetToken()', () => {
    it('should reset token', () => {
      (JwtTokenService.setToken as jest.Mock).mockReset();
      (JwtTokenService.setRefreshToken as jest.Mock).mockReset();

      store['resetToken']();

      expect(JwtTokenService.setToken).toHaveBeenCalledTimes(1);
      expect(JwtTokenService.setToken).toHaveBeenCalledWith();

      expect(JwtTokenService.setRefreshToken).toHaveBeenCalledTimes(1);
      expect(JwtTokenService.setRefreshToken).toHaveBeenCalledWith();
    });
  });

  describe('signOut()', () => {
    it('should sign out', () => {
      localStorageMock = mockWindowStorage(userMock);
      WindowService.localStorage = localStorageMock;
      store = new AuthStore();

      (store['windowLocalStorage'].setItem as jest.Mock).mockClear();
      (store['windowLocalStorage'].removeItem as jest.Mock).mockClear();

      store['signOut']();

      expect(store['windowLocalStorage'].removeItem).toHaveBeenCalledTimes(1);
      expect(store['windowLocalStorage'].removeItem).toHaveBeenCalledWith('user-authentication-user');

      expect(store['windowLocalStorage'].setItem).not.toHaveBeenCalled();
    });
  });

  describe('setUser()', () => {
    it('should set the user', () => {
      (store['windowLocalStorage'].setItem as jest.Mock).mockClear();
      (store['windowLocalStorage'].removeItem as jest.Mock).mockClear();

      store['setUser'](userMock);

      expect(store['windowLocalStorage'].removeItem).not.toHaveBeenCalled();
      expect(store['windowLocalStorage'].setItem).toHaveBeenCalledTimes(1);
      expect(store['windowLocalStorage'].setItem).toHaveBeenCalledWith(
        'user-authentication-user',
        JSON.stringify({
          id: userMock.userId,
          first_name: userMock.first_name,
          last_name: userMock.last_name,
          image: userMock.image,
          email: userMock.email,
        })
      );
    });

    it('should just remove the user if null is passed', () => {
      (store['windowLocalStorage'].setItem as jest.Mock).mockClear();
      (store['windowLocalStorage'].removeItem as jest.Mock).mockClear();

      store['setUser'](null);

      expect(store['windowLocalStorage'].setItem).not.toHaveBeenCalled();
      expect(store['windowLocalStorage'].removeItem).toHaveBeenCalledTimes(1);
      expect(store['windowLocalStorage'].removeItem).toHaveBeenCalledWith('user-authentication-user');
    });
  });
});
