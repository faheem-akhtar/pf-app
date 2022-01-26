import { apiAuthSignInFetcher } from 'api/auth/sign-in/fetcher';
import { ApiAuthSignInRequestInterface } from 'api/auth/sign-in/request.interface';
import { ApiFetcherResultType } from 'api/fetcher-result-type';
import { UserInterface } from 'components/user/interface';
import { AuthService } from 'services/auth/service';

import { AuthSubscribeEventTypeEnum } from './subscribe-event-type.enum';

/**
 * Login user
 */
export const AuthLoginService = (model: ApiAuthSignInRequestInterface): Promise<ApiFetcherResultType<UserInterface>> =>
  apiAuthSignInFetcher({
    email: model.email,
    password: model.password,
    captcha_token: model?.captcha_token,
  }).then((response) => {
    if (!response.ok) {
      return AuthService.onLoginRejected(response);
    }

    AuthService.onAuthResolved(response.data, AuthSubscribeEventTypeEnum.login, 'Email');

    return {
      ...response,
      data: response.data?.user,
    };
  });
