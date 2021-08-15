import { ApiFetcherResultType } from 'api/fetcher-result-type';
import { WindowService } from 'services/window/service';

import { apiAuthRefreshTokenFetcher } from 'api/auth/refresh-token/fetcher';
import { ApiAuthRefreshTokenModelInterface } from 'api/auth/refresh-token/model.interface';

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
   * Constructor
   */
  constructor() {
    this.initToken();
  }

  /**
   * @inheritDoc
   */
  public setToken(token?: string | null): void {
    // Remove old token from local storage
    WindowService.localStorage.removeItem(this.tokenKey);

    if (!token) {
      this.token = null;
      return;
    }

    // Add new token to api store
    this.token = token;

    // Store token in localStorage
    WindowService.localStorage.setItem(this.tokenKey, this.token);
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
    })
      .then((result: ApiFetcherResultType<ApiAuthRefreshTokenModelInterface>) => {
        this.refreshTokenPromise = null;
        if (result.ok) {
          const tokenValue: string = result.data.data.attributes.payload;
          this.setToken(tokenValue);
          this.setRefreshToken(result.data.data.attributes.refresh_token);

          return tokenValue;
        }

        // eslint-disable-next-line no-console
        console.error('Failed to refresh auth token', result.error);
        return null;
      })
      .catch(() => {
        this.refreshTokenPromise = null;
        // Remove old token
        this.setToken();
        return null;
      });

    return this.refreshTokenPromise;
  }

  /**
   * @inheritDoc
   */
  public setRefreshToken(token?: string): void {
    // Remove old token from local storage
    WindowService.localStorage.removeItem(this.refreshTokenKey);

    if (!token) {
      return;
    }

    WindowService.localStorage.setItem(this.refreshTokenKey, token);
  }

  /**
   * @inheritDoc
   */
  public getRefreshToken(): string | null {
    const storageData = WindowService.localStorage.getItem(this.refreshTokenKey);

    if (!storageData) {
      return null;
    }

    return String(storageData);
  }

  /**
   * Initialize token
   */
  private initToken(): void {
    const token = WindowService.localStorage.getItem(this.tokenKey);

    if (!token) {
      return;
    }

    this.token = token as string;
  }
}
