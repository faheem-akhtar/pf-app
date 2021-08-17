import { apiAuthChangePasswordFetcher } from 'api/auth/change-password/fetcher';
import { ApiAuthChangePasswordRequestInterface } from 'api/auth/change-password/request.interface';
import { ApiFetcherResultFailureInterface } from 'api/fetcher-result-failure.interface';
import AuthService from 'services/auth/service';

/**
 * Change password
 */
export const AuthChangePasswordService = (
  model: ApiAuthChangePasswordRequestInterface
): Promise<void | ApiFetcherResultFailureInterface> =>
  apiAuthChangePasswordFetcher({
    repeat_password: model.repeat_password,
    reset_token: model.reset_token,
    password: model.password,
  })
    .then((user) => {
      if (!user.ok) {
        return AuthService.onChangePasswordRejected(user);
      }
    })
    .catch(AuthService.onChangePasswordRejected);
