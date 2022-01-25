import { apiAuthSocialLoginGoogleFetcher } from 'api/auth/social-login/google.fetcher';
import { ApiAuthSocialLoginModelInterface } from 'api/auth/social-login/model.interface';
import { ApiFetcherResultSuccessInterface } from 'api/fetcher-result-success.interface';
import { importScript } from 'helpers/import/script';
import { AuthService } from 'services/auth/service';
import { WindowService } from 'services/window/service';

import { AuthSubscribeEventTypeEnum } from './subscribe-event-type.enum';

const SCRIPT_URL = '//apis.google.com/js/api:client.js';

export const AuthGoogleService = {
  signIn: (): Promise<ApiAuthSocialLoginModelInterface> => {
    return new Promise((resolve, reject) => {
      // Import google script
      importScript(SCRIPT_URL).then(() => {
        const gapi = WindowService.getGapi();

        if (!gapi) {
          reject();
          return;
        }

        // Load auth provider
        gapi.load('auth2', () => {
          const auth2 = gapi.auth2.init({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_AUTH,
          });

          // Logging user in
          auth2
            .signIn()
            .then((response) => {
              apiAuthSocialLoginGoogleFetcher(response.getAuthResponse(true).id_token).then((res) => {
                if (!res.ok) {
                  reject(res);
                  return;
                }

                AuthService.onAuthResolved(res.data, AuthSubscribeEventTypeEnum.login, 'Google');
                resolve((res as ApiFetcherResultSuccessInterface<ApiAuthSocialLoginModelInterface>).data);
              });
            })
            .catch(reject);
        });
      });
    });
  },
};
