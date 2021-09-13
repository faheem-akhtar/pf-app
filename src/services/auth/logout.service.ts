import { apiAuthLogoutFetcher } from 'api/auth/logout/fetcher';
import { AuthService } from 'services/auth/service';

/**
 * Logout user and remove information
 */
export const AuthLogoutService = (): Promise<void> =>
  apiAuthLogoutFetcher().then(() => {
    AuthService.updateUserData(null);
    AuthService.logOut();
  });
