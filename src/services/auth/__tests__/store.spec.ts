import { mockWindowFetch } from 'mocks/window/fetch.mock';
import { tealiumServiceStub } from 'stubs/tealium/service.stub';
import { userModelStub } from 'stubs/user/model.stub';
import { windowStorageStub } from 'stubs/window/storage.stub';

import { AuthGoogleOneTapService } from 'services/auth/google-one-tap.service';
import { JwtTokenService } from 'services/jwt/token/service';
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

  beforeEach(() => {
    window.utag = tealiumServiceStub();
    signInSpy = jest.spyOn(AuthGoogleOneTapService, 'signIn');

    localStorageMock = windowStorageStub();

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
      localStorageMock = windowStorageStub(userModelStub());
      WindowService.localStorage = localStorageMock;

      store = new AuthStore();

      expect(signInSpy).not.toHaveBeenCalled();
    });
  });

  describe('updateUserData()', () => {
    it('should update user information', () => {
      const updateMock = jest.fn();
      store['subscribers'] = [updateMock];

      store['updateUserData'](userModelStub(), AuthSubscribeEventTypeEnum.login, 'Google');

      expect(updateMock).toHaveBeenCalledWith(userModelStub(), { eventType: 'login', providerType: 'Google' });
    });

    it('should accept event type', () => {
      const updateMock = jest.fn();
      store['subscribers'] = [updateMock];

      store['updateUserData'](userModelStub(), AuthSubscribeEventTypeEnum.register, 'Google');

      expect(updateMock).toHaveBeenCalledTimes(1);
      expect(updateMock).toHaveBeenCalledWith(userModelStub(), { eventType: 'register', providerType: 'Google' });
    });
  });

  describe('subscribe()', () => {
    it('should call subscriber right after subscription with latest data', () => {
      const onUpdateMock = jest.fn();
      expect(store['subscribers']).toEqual([]);

      store.subscribe(onUpdateMock);

      expect(onUpdateMock).toHaveBeenCalledWith(null, { eventType: 'subscribe', providerType: null });
    });

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
      localStorageMock = windowStorageStub(userModelStub());
      WindowService.localStorage = localStorageMock;
      store = new AuthStore();

      (store['windowLocalStorage'].setItem as jest.Mock).mockClear();
      (store['windowLocalStorage'].removeItem as jest.Mock).mockClear();

      await store.logOut();

      expect(window.utag.link).toHaveBeenCalledTimes(1);
      expect(store['windowLocalStorage'].removeItem).toHaveBeenCalledWith('user-authentication-user');

      expect(store['windowLocalStorage'].setItem).not.toHaveBeenCalled();
    });
  });

  describe('getUser()', () => {
    it('should return null if data is not there', () => {
      localStorageMock = windowStorageStub();
      WindowService.localStorage = localStorageMock;
      store = new AuthStore();

      expect(store.getUser()).toBeNull();
    });

    it('should return null if data is not an object', () => {
      localStorageMock = windowStorageStub('not an object');
      WindowService.localStorage = localStorageMock;
      store = new AuthStore();

      expect(store.getUser()).toBeNull();
    });

    it('should return the user', () => {
      localStorageMock = windowStorageStub(userModelStub());
      WindowService.localStorage = localStorageMock;
      store = new AuthStore();

      expect(store.getUser()).toEqual(userModelStub());
    });

    it('should be able to handle the user', () => {
      localStorageMock = windowStorageStub({});
      WindowService.localStorage = localStorageMock;
      store = new AuthStore();

      expect(store.getUser()).toEqual(
        userModelStub({
          userId: '',
          email: '',
          first_name: '',
          last_name: '',
          image: '',
        })
      );
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
        user: userModelStub(),
        meta: {
          token: 'my token',
          refresh_token: 'refresh token',
        },
      };
    });

    it('should update data', () => {
      store.onAuthResolved(data, AuthSubscribeEventTypeEnum.login, 'Google');

      expect(JwtTokenService.setRefreshToken).toHaveBeenCalledTimes(1);
      expect(JwtTokenService.setRefreshToken).toHaveBeenCalledWith('refresh token');
      expect(JwtTokenService.setToken).toHaveBeenCalledTimes(1);
      expect(JwtTokenService.setToken).toHaveBeenCalledWith('my token');
    });

    it('should update user data in local storage', () => {
      const updateMock = jest.fn();
      store['subscribers'] = [updateMock];

      const { userId, ...userData } = userModelStub();

      store.onAuthResolved(data, AuthSubscribeEventTypeEnum.login, 'Google');

      expect(store['windowLocalStorage'].removeItem).not.toHaveBeenCalled();
      expect(store['windowLocalStorage'].setItem).toHaveBeenCalledWith('user-authentication-user', {
        id: userId,
        ...userData,
      });

      expect(updateMock).toHaveBeenCalledWith(userModelStub(), { eventType: 'login', providerType: 'Google' });
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

    it('should handle 401 error when the detail is empty', () => {
      expect(
        store.onLoginRejected({
          ok: false,
          headers: {} as Headers,
          error: { status: 401, body: '{"errors": [{ "detail": "" }]}', url: '' },
        })
      ).toEqual({ ok: false, headers: {} as Headers, error: { status: 401, body: '', url: '' } });
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

    it('should handle 400 error when the detail is empty', () => {
      expect(
        store.onAuthRejected({
          ok: false,
          headers: {} as Headers,
          error: { status: 400, body: '{"errors": [{ "detail": "" }]}', url: '' },
        })
      ).toEqual({ ok: false, headers: {} as Headers, error: { status: 400, body: '', url: '' } });
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
      localStorageMock = windowStorageStub(userModelStub());
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

      store['setUser'](userModelStub());

      const { userId, ...userData } = userModelStub();

      expect(store['windowLocalStorage'].removeItem).not.toHaveBeenCalled();
      expect(store['windowLocalStorage'].setItem).toHaveBeenCalledTimes(1);
      expect(store['windowLocalStorage'].setItem).toHaveBeenCalledWith('user-authentication-user', {
        id: userId,
        ...userData,
      });
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
