import { ApiAuthAutoRegisterModelInterface } from 'api/auth/auto-register/model.interface';
import { ApiAuthAutoRegisterRequestInterface } from 'api/auth/auto-register/request.interface';
import { ApiFactory } from 'api/factory';
import { ApiFetcherResultType } from 'api/fetcher-result-type';
import { ApiJsonModelInterface } from 'api/json/model.interface';
import { LocaleService } from 'services/locale/service';

const fetcher = ApiFactory<
  ApiAuthAutoRegisterModelInterface,
  ApiAuthAutoRegisterModelInterface,
  ApiJsonModelInterface<ApiAuthAutoRegisterRequestInterface>
>({
  method: 'POST',
  url: 'user/auto-register',
  alterHeaders: (headers) => {
    headers['content-type'] = 'application/vnd.api+json';
  },
  // TODO-FE[TPNX-3188] - Add data adapter if needed
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
