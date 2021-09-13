import { ApiAuthAutoRegisterModelInterface } from 'api/auth/auto-register/model.interface';
import { ApiAuthAutoRegisterRequestInterface } from 'api/auth/auto-register/request.interface';
import { ApiAuthAutoRegisterResponseInterface } from 'api/auth/auto-register/response.interface';
import { ApiFactory } from 'api/factory';
import { ApiFetcherResultType } from 'api/fetcher-result-type';
import { ApiJsonModelInterface } from 'api/json/model.interface';
import { LocaleService } from 'services/locale/service';

const fetcher = ApiFactory<
  ApiAuthAutoRegisterModelInterface,
  ApiAuthAutoRegisterResponseInterface,
  ApiJsonModelInterface<ApiAuthAutoRegisterRequestInterface>
>({
  method: 'POST',
  url: 'user/auto-register',
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

export const apiAuthAutoRegisterFetcher = (requestParams: {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}): Promise<ApiFetcherResultType<ApiAuthAutoRegisterModelInterface>> => {
  const locale = LocaleService.getLocale();
  return fetcher({
    locale,
    postData: {
      data: {
        type: 'user_auto_register',
        attributes: {
          first_name: requestParams.first_name,
          last_name: requestParams.last_name,
          email: requestParams.email,
          phone: requestParams.phone,
        },
      },
    },
  });
};
