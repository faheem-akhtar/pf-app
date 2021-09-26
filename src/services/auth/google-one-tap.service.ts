import { apiAuthSocialLoginGoogleFetcher } from 'api/auth/social-login/google.fetcher';
import { ApiAuthSocialLoginModelInterface } from 'api/auth/social-login/model.interface';
import { ApiFetcherResultSuccessInterface } from 'api/fetcher-result-success.interface';
import { importScript } from 'helpers/import/script';
import { AuthService } from 'services/auth/service';
import { WindowService } from 'services/window/service';

import { AuthSubscribeEventTypeEnum } from './subscribe-event-type.enum';

const scriptUrl = 'https://accounts.google.com/gsi/client';

export const AuthGoogleOneTapService = {
  signIn: (): Promise<ApiAuthSocialLoginModelInterface> => {
    return new Promise((resolve, reject) => {
      // Import google script
      importScript(scriptUrl).then(() => {
        const google = WindowService.getGoogle();
        if (!google) {
          return;
        }
        google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_AUTH,
          callback: (result: { credential: string }) => {
            apiAuthSocialLoginGoogleFetcher(result.credential).then((res) => {
              if (!res.ok) {
                reject(res);
                return;
              }

              AuthService.onAuthResolved(res.data, AuthSubscribeEventTypeEnum.login);
              resolve((res as ApiFetcherResultSuccessInterface<ApiAuthSocialLoginModelInterface>).data);
            });
          },
        });
        google.accounts.id.prompt();
      });
    });
  },
};
