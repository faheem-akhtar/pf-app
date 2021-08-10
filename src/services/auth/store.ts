import { ApiFetcherResultFailureInterface } from 'api/fetcher-result-failure.interface';
import { UserModelInterface } from 'services/user/model.interface';

export class AuthStore {
  /**
   * User key in browser storage
   */
  private readonly userKey: string = 'user-authentication-user';

  /**
   * User authentication provider key in browser storage
   */
  private readonly authenticationProviderKey: string = 'user-authentication-provider';

  // /**
  //  * TODO-FE[TPNX-3189] - Uncomment and update
  //  */
  // public getToken(): string | null {
  //   const model = this.jwtTokenService.getToken();
  //
  //   if (!model) {
  //     return null;
  //   }
  //
  //   return model.payload;
  // }

  /**
   * @inheritDoc
   */
  public logOut(): void {
    // TODO-FE[TPNX-3189] - Uncomment and update
    // this.resetToken();
    this.signOut();
  }

  /**
   * @inheritDoc
   */
  public getUser(): UserModelInterface | null {
    const data = <UserModelInterface>JSON.parse(localStorage.getItem(this.userKey) as string);

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

  // TODO-FE[TPNX-3189] - Uncomment and update
  // /**
  //  * Reset token and refresh token
  //  */
  // private resetToken(): void {
  //   this.setToken();
  //   this.jwtTokenService.setRefreshToken();
  // }

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
      localStorage.removeItem(this.userKey);

      return;
    }

    localStorage.setItem(
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
   * User login promise rejected
   * TODO-FE[TPNX-3188] - Update handler
   */
  public onSignInRejected = (errors: ApiFetcherResultFailureInterface): ApiFetcherResultFailureInterface => {
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
