import { mockWindowFetch } from 'mocks/window/fetch.mock';
import { mockWindowImportScript } from 'mocks/window/import-script.mock';
import { googleOneTapStub } from 'stubs/google/one-tap.stub';
import { responseSocialLoginStub } from 'stubs/response/social-login.stub';

import { ApiAuthSocialLoginResponseInterface } from 'api/auth/social-login/response.interface';
import { AuthGoogleOneTapService } from 'services/auth/google-one-tap.service';
import { AuthService } from 'services/auth/service';
import { WindowService } from 'services/window/service';

jest.mock('services/auth/service');

describe('AuthGoogleOneTapService', () => {
  const data: ApiAuthSocialLoginResponseInterface = responseSocialLoginStub();

  beforeEach(() => {
    global.origin = 'test.origin';
  });

  describe('signIn', () => {
    it('should import google script', () => {
      const importScriptMock = mockWindowImportScript();

      AuthGoogleOneTapService.signIn();

      expect(importScriptMock.spy).toHaveBeenCalledWith('https://accounts.google.com/gsi/client');
      expect(true).toEqual(true);
    });

    it('should init google one tap and resolve promise', async () => {
      mockWindowImportScript();

      jest
        .spyOn(WindowService, 'getGoogle')
        .mockReturnValue(googleOneTapStub({ credential: 'credential', select_by: '', client_id: '' }));
      AuthService['onAuthResolved'] = jest.fn();
      const fetchMock = mockWindowFetch({
        ok: true,
        status: 200,
        json: (): Promise<{}> => Promise.resolve(data),
      });

      await AuthGoogleOneTapService.signIn();

      expect(fetchMock).toHaveBeenCalled();

      expect(AuthService['onAuthResolved']).toHaveBeenCalledWith(
        {
          user: {
            email: 'test@propertyfinder.ae',
            first_name: 'first name',
            last_name: 'last_name',
            image: 'image',
            userId: '1',
          },
          meta: { token: 'token', refresh_token: 'refresh token' },
          email: 'test@propertyfinder.ae',
        },
        'login',
        'Google'
      );
    });

    it('should load google one tap and reject promise', () => {
      mockWindowImportScript();

      jest
        .spyOn(WindowService, 'getGoogle')
        .mockReturnValue(googleOneTapStub({ credential: 'credential', select_by: '', client_id: '' }));
      AuthService['onAuthResolved'] = jest.fn();
      const fetchMock = mockWindowFetch({
        ok: false,
        status: 500,
      });

      AuthGoogleOneTapService.signIn().then(() => {
        expect(fetchMock).not.toHaveBeenCalled();
      });
    });
  });
});
