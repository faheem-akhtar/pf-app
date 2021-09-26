/**
 * @jest-environment jsdom
 */

import { mockWindowFetch } from 'mocks/window/fetch.mock';
import { userModelStub } from 'stubs/user/model.stub';

import { ApiFetcherResultFailureInterface } from 'api/fetcher-result-failure.interface';
import { AuthModelInterface } from 'services/auth/model.interface';
import { JwtTokenService } from 'services/jwt/token/service';

import { AuthService } from '../service';
import { AuthSubscribeEventTypeEnum } from '../subscribe-event-type.enum';

describe('AuthService', () => {
  describe('updateUserData', () => {
    it('should update user data in auth subscribers', () => {
      const subscribersSpy = jest.fn();

      AuthService.subscribe(subscribersSpy);

      const userStub = userModelStub();
      AuthService['updateUserData'](userModelStub());

      expect(subscribersSpy).toBeCalledWith(userStub, undefined);
    });
  });

  describe('getUser', () => {
    it('should not return user data', () => {
      AuthService['windowLocalStorage'].getItem = jest.fn().mockReturnValue(null);
      expect(AuthService.getUser()).toEqual(null);

      AuthService['windowLocalStorage'].getItem = jest.fn().mockReturnValue('error');
      expect(AuthService.getUser()).toEqual(null);
    });

    it('should return user data', () => {
      AuthService['windowLocalStorage'].getItem = jest.fn().mockReturnValue(userModelStub());
      expect(AuthService.getUser()).toEqual(userModelStub());
    });
  });

  describe('onAuthResolved', () => {
    it('should store user data and set JWT token', () => {
      AuthService['windowLocalStorage'].setItem = jest.fn();
      const setTokenSpy = jest.spyOn(JwtTokenService, 'setToken');
      const setRefreshTokenSpy = jest.spyOn(JwtTokenService, 'setRefreshToken');
      const user = userModelStub();
      const subscribersSpy = jest.fn();
      AuthService.subscribe(subscribersSpy);
      const data: AuthModelInterface = {
        user,
        meta: {
          refresh_token: 'refresh token',
          token: 'token',
        },
      };

      AuthService['onAuthResolved'](data, AuthSubscribeEventTypeEnum.login);

      expect(setRefreshTokenSpy).toBeCalledWith(data.meta.refresh_token);
      expect(setTokenSpy).toBeCalledWith(data.meta.token);
      expect(AuthService['windowLocalStorage'].setItem).toBeCalledWith(
        'user-authentication-user',
        JSON.stringify({
          id: user.userId,
          first_name: user.first_name,
          last_name: user.last_name,
          image: user.image,
          email: user.email,
        })
      );
      expect(subscribersSpy).toBeCalledWith(user, { eventType: 'login' });
    });
  });
  describe('signOut', () => {
    it('should clean user data', () => {
      AuthService['setUser'] = jest.fn();
      AuthService['getUser'] = jest.fn().mockReturnValue({});

      AuthService['signOut']();

      expect(AuthService['setUser']).toBeCalledWith(null);
    });
  });

  describe('logOut', () => {
    it('should clear token and reset token and notify server', async () => {
      const fetchMock = mockWindowFetch();
      JwtTokenService['token'] = 'user_authenticated';
      const setTokenSpy = jest.spyOn(JwtTokenService, 'setToken');
      const setRefreshTokenSpy = jest.spyOn(JwtTokenService, 'setRefreshToken');
      AuthService['signOut'] = jest.fn();

      await AuthService.logOut();

      expect(setTokenSpy).toBeCalled();
      expect(setRefreshTokenSpy).toBeCalled();
      expect(AuthService['signOut']).toBeCalled();
      expect(fetchMock).toHaveBeenCalledWith('default-origin/en/api/user/logout', {
        body: undefined,
        headers: { 'content-type': 'application/vnd.api+json', locale: 'en', 'x-pf-jwt': 'Bearer user_authenticated' },
        method: 'POST',
      });
    });
  });

  describe('onLoginRejected', () => {
    it('should return error', () => {
      const error = {
        error: {
          url: '',
          body: JSON.stringify({
            errors: [{ detail: 'Error message' }],
          }),
          status: 401,
        },
        ok: false,
        headers: null,
      };

      expect(AuthService['onLoginRejected'](error as ApiFetcherResultFailureInterface).error.body).toEqual(
        'Error message'
      );
    });

    it('should return empty message in case of server error', () => {
      const error = {
        error: {
          url: '',
          body: JSON.stringify({
            errors: [{ detail: 'Error message' }],
          }),
          status: 500,
        },
        ok: false,
        headers: null,
      };

      expect(AuthService['onLoginRejected'](error as ApiFetcherResultFailureInterface).error.body).toEqual('');
    });
  });

  describe('onAuthRejected', () => {
    it('should return empty error in case of validation error', () => {
      const error: ApiFetcherResultFailureInterface = {
        error: {
          url: '',
          body: JSON.stringify({
            errors: [{ detail: 'Error message' }],
          }),
          status: 400,
        },
        ok: false,
        headers: null,
      };

      expect(AuthService['onAuthRejected'](error).error.body).toEqual('Error message');
    });

    it('should return empty error in case of server error', () => {
      const error = {
        error: {
          url: '',
          body: JSON.stringify({
            errors: [{ detail: 'Error message' }],
          }),
          status: 500,
        },
        ok: false,
        headers: null,
      };

      expect(AuthService['onAuthRejected'](error as ApiFetcherResultFailureInterface).error.body).toEqual('');
    });
  });
});
