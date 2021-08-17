import { apiAuthSignInFetcher } from 'api/auth/sign-in/fetcher';
import { ApiAuthSignInRequestInterface } from 'api/auth/sign-in/request.interface';
import { ApiFetcherResultFailureInterface } from 'api/fetcher-result-failure.interface';
import AuthService from 'services/auth/service';
import { UserModelInterface } from 'services/user/model.interface';

/**
 * Login user
 */
export const AuthLoginService = (
  model: ApiAuthSignInRequestInterface
): Promise<UserModelInterface | ApiFetcherResultFailureInterface> =>
  apiAuthSignInFetcher({
    email: model.email,
    password: model.password,
    captcha_token: model?.captcha_token,
  })
    .then((model) => {
      if (!model.ok) {
        return AuthService.onLoginRejected(model);
      }

      AuthService.onAuthResolved(model);
      return model.data.user;
    })
    .catch(AuthService.onLoginRejected);
