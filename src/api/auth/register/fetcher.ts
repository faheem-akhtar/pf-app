import { ApiAuthRegisterModelInterface } from 'api/auth/register/model.interface';
import { ApiAuthRegisterRequestInterface } from 'api/auth/register/request.interface';
import { ApiAuthRegisterResponseInterface } from 'api/auth/register/response.interface';
import { ApiFactory } from 'api/factory';
import { ApiFetcherResultType } from 'api/fetcher-result-type';
import { ApiJsonModelInterface } from 'api/json/model.interface';
import { LocaleService } from 'services/locale/service';

const fetcher = ApiFactory<
  ApiAuthRegisterModelInterface,
  ApiAuthRegisterResponseInterface,
  ApiJsonModelInterface<ApiAuthRegisterRequestInterface>
>({
  method: 'POST',
  url: 'user/register',
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

export const apiAuthRegisterFetcher = (requestParams: {
  first_name: string;
  last_name: string;
  password: string;
  opted_in: boolean;
  email: string;
  captcha_token: string | undefined;
}): Promise<ApiFetcherResultType<ApiAuthRegisterModelInterface>> => {
  const locale = LocaleService.getLocale();
  return fetcher({
    locale,
    postData: {
      data: {
        type: 'user_register',
        attributes: {
          first_name: requestParams.first_name,
          last_name: requestParams.last_name,
          email: requestParams.email,
          password: requestParams.password,
          opted_in: requestParams.opted_in,
          ...(requestParams.captcha_token && { captcha_token: requestParams.captcha_token }),
        },
      },
    },
  });
};
