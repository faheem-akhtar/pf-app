import { apiAuthRefreshTokenFetcher } from 'api/auth/refresh-token/fetcher';
import { ApiAuthRefreshTokenModelInterface } from 'api/auth/refresh-token/model.interface';
import { ApiFetcherResultType } from 'api/fetcher-result-type';
import { WindowLocalStorageInterface } from 'services/window/local-storage/interface';
import { WindowService } from 'services/window/service';

export class JwtTokenStore {
  /**
   * JWT token
   * @private
   */
  private token: string | null = null;

  /**
   * Token key in browser storage
   */
  private readonly tokenKey: string = 'user-authentication-token-v2';

  /**
   * Refresh token key in browser storage
   */
  private readonly refreshTokenKey: string = 'user-refresh-token-v2';

  /**
   * Set if token refresh is in progress
   */
  private refreshTokenPromise: Promise<string | null> | null = null;

  /**
   * Window local storage
   * @private
   */
  private windowLocalStorage: WindowLocalStorageInterface;

  /**
   * Constructor
   */
  constructor() {
    this.windowLocalStorage = WindowService.localStorage;
    this.initToken();
  }

  /**
   * @inheritDoc
   */
  public setToken(token?: string | null): void {
    // Remove old token from local storage
    this.windowLocalStorage.removeItem(this.tokenKey);

    if (!token) {
      this.token = null;
      return;
    }

    // Add new token to api store
    this.token = token;

    // Store token in localStorage
    this.windowLocalStorage.setItem(this.tokenKey, this.token);
  }

  /**
   * @inheritDoc
   */
  public getToken(): string | null {
    return this.token || null;
  }

  /**
   * Refresh token
   */
  public refreshToken(): Promise<null | string> {
    if (this.refreshTokenPromise) {
      return this.refreshTokenPromise;
    }
    const token = this.getToken();

    if (!token) {
      return Promise.resolve(null);
    }

    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      // Remove old token
      this.setToken();
      return Promise.resolve(null);
    }

    this.refreshTokenPromise = apiAuthRefreshTokenFetcher({
      authToken: token,
      refreshToken,
    }).then((result: ApiFetcherResultType<ApiAuthRefreshTokenModelInterface>) => {
      this.refreshTokenPromise = null;
      if (result.ok) {
        const tokenValue: string = result.data.data.attributes.payload;
        this.setToken(tokenValue);
        this.setRefreshToken(result.data.data.attributes.refresh_token);

        return tokenValue;
      } else {
        this.setToken();
      }

      // eslint-disable-next-line no-console
      console.error('Failed to refresh auth token', result.error);
      return null;
    });

    return this.refreshTokenPromise;
  }

  /**
   * @inheritDoc
   */
  public setRefreshToken(token?: string): void {
    // Remove old token from local storage
    this.windowLocalStorage.removeItem(this.refreshTokenKey);

    if (!token) {
      return;
    }

    this.windowLocalStorage.setItem(this.refreshTokenKey, token);
  }

  /**
   * @inheritDoc
   */
  public getRefreshToken(): string | null {
    const storageData = this.windowLocalStorage.getItem(this.refreshTokenKey);

    if (!storageData) {
      return null;
    }

    return String(storageData);
  }

  /**
   * Initialize token
   */
  private initToken(): void {
    const token = this.windowLocalStorage.getItem(this.tokenKey);

    if (!token) {
      return;
    }

    this.token = token as string;
  }
}
