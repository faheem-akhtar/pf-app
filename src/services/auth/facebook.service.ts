import { apiAuthSocialLoginFacebookFetcher } from 'api/auth/social-login/facebook.fetcher';
import { ApiAuthSocialLoginModelInterface } from 'api/auth/social-login/model.interface';
import { ApiFetcherResultSuccessInterface } from 'api/fetcher-result-success.interface';
import { AuthService } from 'services/auth/service';
import { importScript } from 'helpers/import/script';
import { WindowService } from 'services/window/service';

/**
 * Script url
 */
const scriptUrl = 'https://connect.facebook.net/en_US/sdk.js';

/**
 * API version
 */
const apiVersion = 'v7.0';

/**
 * User scope
 */
const scope = 'public_profile,email';

export const AuthFacebookService = {
  signIn: (): Promise<ApiAuthSocialLoginModelInterface> => {
    return new Promise((resolve, reject) => {
      // Import FB script
      importScript(scriptUrl).then(() => {
        const facebook = WindowService.getFB();

        // Init provider
        facebook?.init({
          appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
          version: apiVersion,
        });

        // Start login
        facebook?.login(
          (response) => {
            if (response.authResponse) {
              // Update user data
              apiAuthSocialLoginFacebookFetcher(response.authResponse.accessToken).then((res) => {
                if (!res.ok) {
                  reject(res.error);
                  return;
                }
                AuthService.onAuthResolved(res.data);
                resolve((res as ApiFetcherResultSuccessInterface<ApiAuthSocialLoginModelInterface>).data);
              });
            } else {
              reject();
            }
          },
          { scope }
        );
      });
    });
  },
};
