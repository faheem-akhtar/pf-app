import { ApiAuthSocialLoginModelInterface } from 'api/auth/social-login/model.interface';
import { ApiAuthSocialLoginRequestInterface } from 'api/auth/social-login/request.interface';
import { ApiFactory } from 'api/factory';
import { ApiFetcherResultType } from 'api/fetcher-result-type';
import { ApiJsonModelInterface } from 'api/json/model.interface';
import { LocaleService } from 'services/locale/service';

const facebookFetcher = ApiFactory<
  ApiAuthSocialLoginModelInterface,
  ApiAuthSocialLoginModelInterface,
  ApiJsonModelInterface<ApiAuthSocialLoginRequestInterface>
>({
  method: 'POST',
  url: 'user/b2c-login-social/google',
  alterHeaders: (headers) => {
    headers['content-type'] = 'application/vnd.api+json';
  },
});

export const apiAuthSocialLoginGoogleFetcher = (
  access_token: string
): Promise<ApiFetcherResultType<ApiAuthSocialLoginModelInterface>> => {
  const locale = LocaleService.getLocale();
  return facebookFetcher({
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
