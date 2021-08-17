import { apiAuthResetPasswordFetcher } from 'api/auth/reset-password/fetcher';
import { ApiAuthResetPasswordModelInterface } from 'api/auth/reset-password/model.interface';
import { ApiAuthResetPasswordRequestInterface } from 'api/auth/reset-password/request.interface';
import { ApiFetcherResultType } from 'api/fetcher-result-type';

/**
 * Change password
 */
export const AuthResetPasswordService = (
  model: ApiAuthResetPasswordRequestInterface
): Promise<ApiFetcherResultType<ApiAuthResetPasswordModelInterface>> =>
  apiAuthResetPasswordFetcher({
    email: model.email,
    captcha_token: model?.captcha_token,
  });
