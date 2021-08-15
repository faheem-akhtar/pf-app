import { apiAuthAutoRegisterFetcher } from 'api/auth/auto-register/fetcher';
import { apiAuthChangePasswordFetcher } from 'api/auth/change-password/fetcher';
import { apiAuthLogoutFetcher } from 'api/auth/logout/fetcher';
import { apiAuthRegisterFetcher } from 'api/auth/register/fetcher';
import { apiAuthResetPasswordFetcher } from 'api/auth/reset-password/fetcher';
import { apiAuthSignInFetcher } from 'api/auth/sign-in/fetcher';

import { ApiAuthAutoRegisterModelInterface } from 'api/auth/auto-register/model.interface';
import { ApiAuthAutoRegisterRequestInterface } from 'api/auth/auto-register/request.interface';
import { ApiAuthChangePasswordRequestInterface } from 'api/auth/change-password/request.interface';
import { ApiAuthRegisterModelInterface } from 'api/auth/register/model.interface';
import { ApiAuthRegisterRequestInterface } from 'api/auth/register/request.interface';
import { ApiAuthResetPasswordModelInterface } from 'api/auth/reset-password/model.interface';
import { ApiAuthResetPasswordRequestInterface } from 'api/auth/reset-password/request.interface';
import { ApiAuthSignInRequestInterface } from 'api/auth/sign-in/request.interface';
import { ApiFetcherResultFailureInterface } from 'api/fetcher-result-failure.interface';
import { ApiFetcherResultSuccessInterface } from 'api/fetcher-result-success.interface';
import { ApiFetcherResultType } from 'api/fetcher-result-type';
import { AuthStore } from 'services/auth/store';
import { AuthSubscriberType } from './subscriber.type';
import { JwtTokenService } from 'services/jwt/token/service';
import { JwtTokenStore } from 'services/jwt/token/store';
import { LocaleEnum } from 'services/locale/enum';
import { LocaleService } from 'services/locale/service';
import { UserModelInterface } from 'services/user/model.interface';

class Service {
  // Application locale
  private readonly locale: LocaleEnum;

  // Auth store instance
  private authStore: AuthStore;

  // Jwt token store store instance
  private jwtTokenService: JwtTokenStore;

  // Service subscribers
  private subscribers: AuthSubscriberType[] = [];

  constructor() {
    this.locale = LocaleService.getLocale();
    this.authStore = new AuthStore();
    this.jwtTokenService = JwtTokenService;
  }

  /**
   * Get user data
   */
  public getUser(): UserModelInterface | null {
    return this.authStore.getUser();
  }

  /**
   * Subscribe to the service update
   */
  public subscribe = (onUpdate: AuthSubscriberType): (() => void) => {
    this.subscribers.push(onUpdate);

    return (): void => {
      this.subscribers = this.subscribers.filter((sub) => sub !== onUpdate);
    };
  };

  /**
   * Register user
   */
  public register = (
    model: ApiAuthRegisterRequestInterface
  ): Promise<UserModelInterface | ApiFetcherResultFailureInterface> =>
    apiAuthRegisterFetcher({
      first_name: model.first_name,
      last_name: model.last_name,
      email: model.email,
      password: model.password,
      opted_in: model.opted_in,
      captcha_token: model?.captcha_token,
    })
      .then((user) => {
        if (!user.ok) {
          return this.authStore.onRegistrationRejected(user);
        }

        this.updateUserData((user as ApiFetcherResultSuccessInterface<ApiAuthRegisterModelInterface>).data.user);
        this.jwtTokenService.setRefreshToken(
          (user as ApiFetcherResultSuccessInterface<ApiAuthRegisterModelInterface>).data.meta.refresh_token
        );

        return user.data.user;
      })
      .catch((error: ApiFetcherResultFailureInterface) => {
        return this.authStore.onRegistrationRejected(error);
      });

  /**
   * Auto register user
   * @param model
   */
  public autoRegister = (
    model: ApiAuthAutoRegisterRequestInterface
  ): Promise<UserModelInterface | ApiFetcherResultFailureInterface> =>
    apiAuthAutoRegisterFetcher({
      first_name: model.first_name,
      last_name: model.last_name,
      email: model.email,
      phone: model.phone,
    })
      .then((user) => {
        if (!user.ok) {
          return this.authStore.onAutoRegistrationRejected(user);
        }

        this.updateUserData((user as ApiFetcherResultSuccessInterface<ApiAuthAutoRegisterModelInterface>).data.user);
        this.jwtTokenService.setRefreshToken(
          (user as ApiFetcherResultSuccessInterface<ApiAuthAutoRegisterModelInterface>).data.meta.refresh_token
        );

        return user.data.user;
      })
      .catch((error: ApiFetcherResultFailureInterface) => {
        return this.authStore.onAutoRegistrationRejected(error);
      });

  /**
   * Sign In user
   * @param model
   */
  public signIn = (model: ApiAuthSignInRequestInterface): Promise<void | ApiFetcherResultFailureInterface> =>
    apiAuthSignInFetcher({
      email: model.email,
      password: model.password,
      captcha_token: model?.captcha_token,
    })
      .then((user) => this.updateUserData(this.authStore.onSignInResolved(user)))
      .catch((error: ApiFetcherResultFailureInterface) => {
        return this.authStore.onSignInRejected(error) as ApiFetcherResultFailureInterface;
      });

  /**
   * Change password
   * @param model
   */
  public changePassword = (
    model: ApiAuthChangePasswordRequestInterface
  ): Promise<void | ApiFetcherResultFailureInterface> =>
    apiAuthChangePasswordFetcher({
      repeat_password: model.repeat_password,
      reset_token: model.reset_token,
      password: model.password,
      locale: this.locale,
    })
      .then((user) => {
        if (!user.ok) {
          return this.authStore.onChangePasswordRejected(user) as ApiFetcherResultFailureInterface;
        }
      })
      .catch((error: ApiFetcherResultFailureInterface) => {
        return this.authStore.onChangePasswordRejected(error) as ApiFetcherResultFailureInterface;
      });

  /**
   * Reset password
   * @param model
   */
  public resetPassword = (
    model: ApiAuthResetPasswordRequestInterface
  ): Promise<ApiFetcherResultType<ApiAuthResetPasswordModelInterface>> =>
    apiAuthResetPasswordFetcher({
      email: model.email,
      captcha_token: model?.captcha_token,
    });

  /**
   * Logout
   */
  public logout = (): Promise<void> =>
    apiAuthLogoutFetcher().then(() => {
      this.updateUserData(null);
    });

  /**
   * Update user information
   * @param userData
   */
  private updateUserData = (userData: UserModelInterface | null): void => {
    this.subscribers.forEach((update) => {
      update(userData);
    });
  };
}

const AuthService = new Service();

export default AuthService;
