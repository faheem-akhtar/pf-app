import { mockWindowFetch } from 'mocks/window/fetch.mock';
import { mockWindowImportScript } from 'mocks/window/import-script.mock';
import { facebookStub } from 'stubs/facebook/stub';
import { socialLoginResponseStub } from 'stubs/response-social-login';

import * as apiAuthSocialLoginFacebookFetcherModule from 'api/auth/social-login/facebook.fetcher';
import { ApiAuthSocialLoginModelInterface } from 'api/auth/social-login/model.interface';
import { ApiAuthSocialLoginResponseInterface } from 'api/auth/social-login/response.interface';
import { AuthFacebookService } from 'services/auth/facebook.service';
import { AuthService } from 'services/auth/service';
import { WindowService } from 'services/window/service';

describe('AuthFacebookService', () => {
  const data: ApiAuthSocialLoginResponseInterface = socialLoginResponseStub();

  beforeEach(() => {
    global.origin = 'test.origin';
  });

  describe('signIn', () => {
    it('should import facebook script', () => {
      const importScriptMock = mockWindowImportScript();

      AuthFacebookService.signIn();

      expect(importScriptMock.spy).toHaveBeenCalledWith('https://connect.facebook.net/en_US/sdk.js');
    });

    it('should init FB and resolve promise', () => {
      mockWindowImportScript();

      jest
        .spyOn(WindowService, 'getFB')
        .mockReturnValue(facebookStub({ authResponse: { accessToken: 'accessToken' } }));
      AuthService['onAuthResolved'] = jest.fn();
      const fetchMock = mockWindowFetch({
        ok: true,
        status: 200,
        json: (): Promise<{}> => Promise.resolve(data),
      });

      AuthFacebookService.signIn().then(() => {
        expect(fetchMock).toHaveBeenCalledWith(data);
        expect(AuthService['onAuthResolved']).toHaveBeenCalledWith(data);
      });
    });

    it('should load FB and reject promise', () => {
      mockWindowImportScript();

      jest
        .spyOn(WindowService, 'getFB')
        .mockReturnValue(facebookStub({ authResponse: { accessToken: 'accessToken' } }));
      AuthService['onAuthResolved'] = jest.fn();
      const fetchMock = mockWindowFetch({
        ok: false,
        status: 500,
      });

      AuthFacebookService.signIn().then(() => {
        expect(fetchMock).not.toHaveBeenCalled();
      });
    });

    it('should start facebook login', async () => {
      const mockUser = {
        email: 'email@example.com',
      } as ApiAuthSocialLoginModelInterface;
      mockWindowImportScript();

      const apiAuthSocialLoginFacebookFetcherMock = jest
        .spyOn(apiAuthSocialLoginFacebookFetcherModule, 'apiAuthSocialLoginFacebookFetcher')
        .mockReturnValue(
          Promise.resolve({
            ok: true,
            headers: {} as Headers,
            data: mockUser,
          })
        );
      jest
        .spyOn(WindowService, 'getFB')
        .mockReturnValue(facebookStub({ authResponse: { accessToken: 'accessToken' } }));

      await AuthFacebookService.signIn();

      expect(apiAuthSocialLoginFacebookFetcherMock).toHaveBeenCalledTimes(1);
      expect(apiAuthSocialLoginFacebookFetcherMock).toHaveBeenCalledWith('accessToken');
    });
  });
});
