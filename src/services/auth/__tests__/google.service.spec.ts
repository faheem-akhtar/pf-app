import { mockWindowFetch } from 'mocks/window/fetch.mock';
import { mockWindowImportScript } from 'mocks/window/import-script.mock';
import { googleGapiStub } from 'stubs/google/gapi.stub';
import { responseSocialLoginStub } from 'stubs/response/social-login.stub';

import { AuthGoogleService } from 'services/auth/google.service';
import { AuthService } from 'services/auth/service';
import { WindowService } from 'services/window/service';

describe('AuthGoogleService', () => {
  const data = responseSocialLoginStub();

  beforeEach(() => {
    global.origin = 'test.origin';
  });

  describe('signIn', () => {
    it('should import google script', () => {
      const importScriptMock = mockWindowImportScript();

      AuthGoogleService.signIn();

      expect(importScriptMock.spy).toHaveBeenCalledWith('//apis.google.com/js/api:client.js');
    });

    it('should load gapi and resolve promise', async () => {
      mockWindowImportScript();

      jest.spyOn(WindowService, 'getGapi').mockReturnValue(googleGapiStub());
      AuthService['onAuthResolved'] = jest.fn();
      const fetchMock = mockWindowFetch({
        ok: true,
        status: 200,
        json: (): Promise<{}> => Promise.resolve(data),
      });

      await AuthGoogleService.signIn();

      expect(fetchMock).toHaveBeenCalled();
    });

    it('should load gapi and reject promise', () => {
      mockWindowImportScript();

      jest.spyOn(WindowService, 'getGapi').mockReturnValue(googleGapiStub());
      AuthService['onAuthResolved'] = jest.fn();
      const fetchMock = mockWindowFetch({
        ok: false,
        status: 500,
      });

      AuthGoogleService.signIn().then(() => {
        expect(fetchMock).not.toHaveBeenCalled();
      });
    });
  });
});
