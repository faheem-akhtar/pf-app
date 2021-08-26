import { ApiAuthResetPasswordModelInterface } from 'api/auth/reset-password/model.interface';
import { ApiAuthResetPasswordRequestInterface } from 'api/auth/reset-password/request.interface';
import { ApiFactory } from 'api/factory';
import { ApiFetcherResultType } from 'api/fetcher-result-type';
import { ApiJsonModelInterface } from 'api/json/model.interface';
import { LocaleService } from 'services/locale/service';

const fetcher = ApiFactory<
  ApiAuthResetPasswordModelInterface,
  ApiAuthResetPasswordModelInterface,
  ApiJsonModelInterface<ApiAuthResetPasswordRequestInterface>
>({
  method: 'POST',
  url: 'user/reset-password',
  alterHeaders: (headers) => {
    headers['content-type'] = 'application/vnd.api+json';
  },
});

export const apiAuthResetPasswordFetcher = (requestParams: {
  email: string;
  captcha_token: string | undefined;
}): Promise<ApiFetcherResultType<ApiAuthResetPasswordModelInterface>> => {
  const locale = LocaleService.getLocale();
  return fetcher({
    locale,
    postData: {
      data: {
        type: 'user_reset_password',
        attributes: {
          email: requestParams.email,
          ...(requestParams.captcha_token && { captcha_token: requestParams.captcha_token }),
        },
      },
    },
  });
};
