import { apiAuthChangePasswordFetcher } from 'api/auth/change-password/fetcher';
import { ApiAuthChangePasswordModelInterface } from 'api/auth/change-password/model.interface';
import { ApiAuthChangePasswordRequestInterface } from 'api/auth/change-password/request.interface';
import { ApiFetcherResultType } from 'api/fetcher-result-type';

/**
 * Change password
 */
export const AuthChangePasswordService = (
  model: ApiAuthChangePasswordRequestInterface
): Promise<ApiFetcherResultType<ApiAuthChangePasswordModelInterface>> =>
  apiAuthChangePasswordFetcher({
    repeat_password: model.repeat_password,
    reset_token: model.reset_token,
    password: model.password,
  });
