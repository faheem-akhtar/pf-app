import { apiAuthLogoutFetcher } from 'api/auth/logout/fetcher';
import { ApiFetcherResultFailureInterface } from 'api/fetcher-result-failure.interface';
import { AuthGoogleOneTapService } from 'services/auth/google-one-tap.service';
import { AuthModelInterface } from 'services/auth/model.interface';
import { AuthSubscriberType } from 'services/auth/subscriber.type';
import { JwtTokenService } from 'services/jwt/token/service';
import { JwtTokenStore } from 'services/jwt/token/store';
import { UserModelInterface } from 'services/user/model.interface';
import { WindowLocalStorageInterface } from 'services/window/local-storage/interface';
import { WindowService } from 'services/window/service';

export class AuthStore {
  /**
   * User key in browser storage
   */
  private readonly userKey: string = 'user-authentication-user';

  /**
   * Service subscribers
   */
  private subscribers: AuthSubscriberType[] = [];

  /**
   * JWT service
   * @private
   */
  private jwtTokenService: JwtTokenStore;

  /**
   * Window local storage
   * @private
   */
  private windowLocalStorage: WindowLocalStorageInterface;

  constructor() {
    this.jwtTokenService = JwtTokenService;
    this.windowLocalStorage = WindowService.localStorage;

    if (!this.getUser() && AuthGoogleOneTapService) {
      // Init Google One Tap
      AuthGoogleOneTapService.signIn();
    }
  }

  /**
   * Update user information
   * @param userData
   */
  private updateUserData = (userData: UserModelInterface | null): void => {
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
  public logOut(): Promise<void> {
    return apiAuthLogoutFetcher().then(() => {
      this.updateUserData(null);
      this.resetToken();
      this.signOut();
    });
  }

  /**
   * Get user data
   */
  public getUser(): UserModelInterface | null {
    const data = <UserModelInterface>this.windowLocalStorage.getItem(this.userKey);

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
   * User authn promise resolved
   */
  public onAuthResolved = (data: AuthModelInterface): void => {
    // Update data
    this.jwtTokenService.setRefreshToken(data.meta.refresh_token);
    this.jwtTokenService.setToken(data.meta.token);

    // Update user data in local storage
    this.setUser(data.user);
    this.updateUserData(data.user);
  };

  /**
   * User login promise rejected
   */
  public onLoginRejected = (errors: ApiFetcherResultFailureInterface): ApiFetcherResultFailureInterface => {
    // If not unauthorized
    if (errors.error.status === 401) {
      errors.error.body = JSON.parse(errors.error.body).errors[0].detail || '';
    } else {
      errors.error.body = '';
    }

    return errors;
  };

  /**
   * User registration promise rejected
   */
  public onAuthRejected = (errors: ApiFetcherResultFailureInterface): ApiFetcherResultFailureInterface => {
    // If not a validation error
    if ([400, 422].indexOf(errors.error.status) !== -1) {
      errors.error.body = JSON.parse(String(errors.error.body)).errors[0].detail || '';
    } else {
      errors.error.body = '';
    }

    return errors;
  };

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
    this.setUser(null);
  }

  /**
   * Set user
   */
  private setUser(model: UserModelInterface | null): void {
    if (!model) {
      this.windowLocalStorage.removeItem(this.userKey);
      return;
    }

    this.windowLocalStorage.setItem(
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
}
