import { ApiFetcherResultFailureInterface } from 'api/fetcher-result-failure.interface';
import { ApiFetcherResultType } from 'api/fetcher-result-type';
import { AuthGoogleOneTapService } from 'services/auth/google-one-tap.service';
import { AuthModelInterface } from 'services/auth/model.interface';
import { AuthSubscriberType } from 'services/auth/subscriber.type';
import { JwtTokenService } from 'services/jwt/token/service';
import { JwtTokenStore } from 'services/jwt/token/store';
import { UserModelInterface } from 'services/user/model.interface';
import { WindowService } from 'services/window/service';

class Service {
  /**
   * User key in browser storage
   */
  private readonly userKey: string = 'user-authentication-user';

  /**
   * User authentication provider key in browser storage
   */
  private readonly authenticationProviderKey: string = 'user-authentication-provider';

  /**
   * Service subscribers
   */
  private subscribers: AuthSubscriberType[] = [];

  /**
   * JWT service
   * @private
   */
  private jwtTokenService: JwtTokenStore;

  constructor() {
    this.jwtTokenService = JwtTokenService;

    if (!this.getUser()) {
      // Init Google One Tap
      AuthGoogleOneTapService.signIn();
    }
  }

  /**
   * Update user information
   * @param userData
   */
  public updateUserData = (userData: UserModelInterface | null): void => {
    this.subscribers.forEach((update) => {
      update(userData);
    });
  };

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
   * Log out ser
   */
  public logOut(): void {
    this.resetToken();
    this.signOut();
  }

  /**
   * Get user data
   */
  public getUser(): UserModelInterface | null {
    const data = <UserModelInterface>WindowService.localStorage.getItem(this.userKey);

    if (!data || typeof data !== 'object') {
      return null;
    }

    return {
      userId: data.userId || '',
      first_name: data.first_name || '',
      last_name: data.last_name || '',
      email: data.email || '',
      image: data.image || '',
    };
  }

  /**
   * Reset token and refresh token
   */
  private resetToken(): void {
    // Clear token
    this.jwtTokenService.setToken();

    // Clear refresh
    this.jwtTokenService.setRefreshToken();
  }

  /**
   * Sign out user
   */
  private signOut(): void {
    // User is already signed out
    if (!this.getUser()) {
      return;
    }

    this.setUser(null);
  }

  /**
   * Set user
   */
  private setUser(model: UserModelInterface | null): void {
    if (!model) {
      WindowService.localStorage.removeItem(this.userKey);
      return;
    }

    WindowService.localStorage.setItem(
      this.userKey,
      JSON.stringify({
        id: model.userId,
        first_name: model.first_name,
        last_name: model.last_name,
        image: model.image,
        email: model.email,
      })
    );
  }

  /**
   * User authn promise resolved
   */
  public onAuthResolved = (response: ApiFetcherResultType<AuthModelInterface>): void => {
    if (!response.ok) {
      this.onLoginRejected(response);
      return;
    }

    // Update data
    this.jwtTokenService.setRefreshToken(response.data.meta.refresh_token);
    this.jwtTokenService.setToken(response.data.meta.token);

    // Update user data in local storage
    this.setUser(response.data.user);
    this.updateUserData(response.data.user);
  };

  /**
   * User login promise rejected
   * TODO-FE[TPNX-3188] - Update handler
   */
  public onLoginRejected = (errors: ApiFetcherResultFailureInterface): ApiFetcherResultFailureInterface => {
    let errorMessage = '';
    // If validation error
    if ([400, 422].indexOf(errors.error.status) !== -1) {
      this.toUserSignInFieldErrors(errors.error.body);
    }

    if (errors.error.status === 401) {
      errorMessage = errors.error.body;
    }

    // Add translation
    errorMessage = 'Something went wrong! Please try again later';
    errors.error.body = errorMessage;
    return errors;
  };

  /**
   * User registration promise rejected
   * TODO-FE[TPNX-3188] - Update handler
   */
  public onRegistrationRejected = (error: ApiFetcherResultFailureInterface): ApiFetcherResultFailureInterface => {
    let errorMessage = '';
    // If validation error
    if ([400, 422].indexOf(error.error.status) !== -1) {
      this.toUserRegistrationFieldErrors(error.error.body);
    }

    // Add translation
    errorMessage = 'Something went wrong! Please try again later';
    error.error.body = errorMessage;
    return error;
  };

  /**
   * User auto registration promise rejected
   * TODO-FE[TPNX-3188] - Update handler
   */
  public onAutoRegistrationRejected = (
    response: ApiFetcherResultFailureInterface
  ): ApiFetcherResultFailureInterface => {
    return response;
  };

  /**
   * Change password rejected
   * TODO-FE[TPNX-3188] - Update handler
   */
  public onChangePasswordRejected = (response: ApiFetcherResultFailureInterface): ApiFetcherResultFailureInterface => {
    if ([400, 422].indexOf(response.error.status) !== -1) {
      this.toUserChangePasswordValidationErrors(response.error.body);
    }

    return response;
  };

  /**
   * Transforms api errors to UserRegistrationFieldErrorsInterface
   * TODO-FE[TPNX-3188] - Update handler
   */
  private toUserRegistrationFieldErrors(errors: string): void {
    // eslint-disable-next-line no-console
    console.error(errors);
  }

  /**
   * Transforms api errors to UserSignInFieldErrorsInterface
   * TODO-FE[TPNX-3188] - Update handler
   */
  private toUserSignInFieldErrors(errors: string): void {
    // eslint-disable-next-line no-console
    console.error(errors);
  }

  /**
   * Transforms api errors to UserChangePasswordFieldErrorsInterface
   * TODO-FE[TPNX-3188] - Update handler
   */
  private toUserChangePasswordValidationErrors(errors: string): void {
    // eslint-disable-next-line no-console
    console.error(errors);
  }
}

const AuthService = new Service();

export default AuthService;
