import { apiAuthRegisterFetcher } from 'api/auth/register/fetcher';
import { ApiAuthRegisterRequestInterface } from 'api/auth/register/request.interface';
import { ApiFetcherResultFailureInterface } from 'api/fetcher-result-failure.interface';
import AuthService from 'services/auth/service';
import { UserModelInterface } from 'services/user/model.interface';

/**
 * Register user
 */
export const AuthRegisterService = (
  model: ApiAuthRegisterRequestInterface
): Promise<UserModelInterface | ApiFetcherResultFailureInterface> =>
  apiAuthRegisterFetcher({
    first_name: model.first_name,
    last_name: model.last_name,
    email: model.email,
    password: model.password,
    opted_in: model.opted_in,
    captcha_token: model?.captcha_token,
  }).then((model) => {
    if (!model.ok) {
      return AuthService.onRegistrationRejected(model);
    }

    AuthService.onAuthResolved(model.data);

    return model.data.user;
  });
