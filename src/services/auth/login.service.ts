import { apiAuthSignInFetcher } from 'api/auth/sign-in/fetcher';
import { ApiAuthSignInRequestInterface } from 'api/auth/sign-in/request.interface';
import { ApiFetcherResultType } from 'api/fetcher-result-type';
import { AuthService } from 'services/auth/service';
import { UserModelInterface } from 'services/user/model.interface';

import { AuthSubscribeEventTypeEnum } from './subscribe-event-type.enum';

/**
 * Login user
 */
export const AuthLoginService = (
  model: ApiAuthSignInRequestInterface
): Promise<ApiFetcherResultType<UserModelInterface>> =>
  apiAuthSignInFetcher({
    email: model.email,
    password: model.password,
    captcha_token: model?.captcha_token,
  }).then((response) => {
    if (!response.ok) {
      return AuthService.onLoginRejected(response);
    }

    AuthService.onAuthResolved(response.data, AuthSubscribeEventTypeEnum.login);

    return {
      ...response,
      data: response.data?.user,
    };
  });
