import { ApiAuthSignInModelInterface } from 'api/auth/sign-in/model.interface';
import { ApiAuthSignInRequestInterface } from 'api/auth/sign-in/request.interface';
import { ApiAuthSignInResponseInterface } from 'api/auth/sign-in/response.interface';
import { ApiFactory } from 'api/factory';
import { ApiFetcherResultType } from 'api/fetcher-result-type';
import { ApiJsonModelInterface } from 'api/json/model.interface';
import { LocaleService } from 'services/locale/service';

const fetcher = ApiFactory<
  ApiAuthSignInModelInterface,
  ApiAuthSignInResponseInterface,
  ApiJsonModelInterface<ApiAuthSignInRequestInterface>
>({
  method: 'POST',
  url: 'user/login',
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
    };
  },
});

export const apiAuthSignInFetcher = (requestParams: {
  email: string;
  password: string;
  captcha_token: string | undefined;
}): Promise<ApiFetcherResultType<ApiAuthSignInModelInterface>> => {
  const locale = LocaleService.getLocale();
  return fetcher({
    locale,
    postData: {
      data: {
        type: 'user_login',
        attributes: {
          email: requestParams.email,
          password: requestParams.password,
          remember_me: true,
          ...(requestParams.captcha_token && { captcha_token: requestParams.captcha_token }),
        },
      },
    },
  });
};
