import { ApiAuthSocialLoginFetcherFactory } from './fetcher-factory';
import { ApiAuthSocialLoginModelInterface } from 'api/auth/social-login/model.interface';
import { ApiFetcherResultType } from 'api/fetcher-result-type';
import { LocaleService } from 'services/locale/service';

export const apiAuthSocialLoginFacebookFetcher = (
  access_token: string
): Promise<ApiFetcherResultType<ApiAuthSocialLoginModelInterface>> => {
  const locale = LocaleService.getLocale();
  return ApiAuthSocialLoginFetcherFactory({ url: 'user/b2c-login-social/facebook' })({
    locale,
    postData: {
      data: {
        type: 'access_token_request',
        attributes: {
          access_token,
        },
      },
    },
  });
};
