import { apiAuthLogoutFetcher } from 'api/auth/logout/fetcher';
import AuthService from 'services/auth/service';

/**
 * Logout user and remove information
 */
export const AuthLogoutService = apiAuthLogoutFetcher().then(() => {
  AuthService.updateUserData(null);
  AuthService.logOut();
});
