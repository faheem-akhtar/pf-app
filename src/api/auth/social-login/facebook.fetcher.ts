import { ApiAuthSocialLoginModelInterface } from 'api/auth/social-login/model.interface';
import { ApiAuthSocialLoginRequestInterface } from 'api/auth/social-login/request.interface';
import { ApiAuthSocialLoginResponseInterface } from 'api/auth/social-login/response.interface';
import { ApiFactory } from 'api/factory';
import { ApiFetcherResultType } from 'api/fetcher-result-type';
import { ApiJsonModelInterface } from 'api/json/model.interface';
import { LocaleService } from 'services/locale/service';

const facebookFetcher = ApiFactory<
  ApiAuthSocialLoginModelInterface,
  ApiAuthSocialLoginResponseInterface,
  ApiJsonModelInterface<ApiAuthSocialLoginRequestInterface>
>({
  method: 'POST',
  url: 'user/b2c-login-social/facebook',
  alterHeaders: (headers) => {
    headers['content-type'] = 'application/vnd.api+json';
  },
  dataMapper: (data) => {
    return {
      user: {
        email: data.included[0].attributes.email,
        first_name: data.included[0].attributes.first_name,
        last_name: data.included[0].attributes.last_name,
        image: data.included[0].attributes.image,
        userId: data.data.relationships.user.data.id,
      },
      meta: {
        token: data.data.meta.token,
        refresh_token: data.data.meta.refresh_token,
      },
      email: data.included[0].attributes.email,
    };
  },
});

export const apiAuthSocialLoginFacebookFetcher = (
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
