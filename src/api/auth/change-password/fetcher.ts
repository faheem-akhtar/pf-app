import { ApiAuthChangePasswordModelInterface } from 'api/auth/change-password/model.interface';
import { ApiAuthChangePasswordRequestInterface } from 'api/auth/change-password/request.interface';
import { ApiFactory } from 'api/factory';
import { ApiFetcherResultType } from 'api/fetcher-result-type';
import { ApiJsonModelInterface } from 'api/json/model.interface';
import { LocaleService } from 'services/locale/service';

const fetcher = ApiFactory<
  ApiAuthChangePasswordModelInterface,
  ApiAuthChangePasswordModelInterface,
  ApiJsonModelInterface<ApiAuthChangePasswordRequestInterface>
>({
  method: 'POST',
  url: 'user/change-password',
  alterHeaders: (headers) => {
    headers['content-type'] = 'application/vnd.api+json';
  },
  // TODO-FE[TPNX-3188] - Add data adapter if needed
});

export const apiAuthChangePasswordFetcher = (requestParams: {
  password: string;
  repeat_password: string;
  reset_token: string;
}): Promise<ApiFetcherResultType<ApiAuthChangePasswordModelInterface>> => {
  const locale = LocaleService.getLocale();
  return fetcher({
    locale,
    postData: {
      data: {
        type: 'user_change_password',
        attributes: {
          password: requestParams.password,
          repeat_password: requestParams.repeat_password,
          reset_token: requestParams.reset_token,
        },
      },
    },
  });
};
