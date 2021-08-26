import { apiAuthRegisterFetcher } from 'api/auth/register/fetcher';
import { ApiAuthRegisterRequestInterface } from 'api/auth/register/request.interface';
import { ApiFetcherResultType } from 'api/fetcher-result-type';
import AuthService from 'services/auth/service';
import { UserModelInterface } from 'services/user/model.interface';

/**
 * Register user
 */
export const AuthRegisterService = (
  model: ApiAuthRegisterRequestInterface
): Promise<ApiFetcherResultType<UserModelInterface>> =>
  apiAuthRegisterFetcher({
    first_name: model.first_name,
    last_name: model.last_name,
    email: model.email,
    password: model.password,
    opted_in: model.opted_in,
    captcha_token: model?.captcha_token,
  }).then((response) => {
    if (!response.ok) {
      return AuthService.onRequestRejected(response);
    }

    AuthService.onAuthResolved(response.data);

    return {
      ...response,
      data: response.data?.user,
    };
  });
