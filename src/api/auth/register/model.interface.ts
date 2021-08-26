import { UserModelInterface } from 'services/user/model.interface';

export interface ApiAuthRegisterModelInterface {
  /**
   * User
   */
  user: UserModelInterface;

  /**
   * Meta data
   */
  meta: {
    /**
     * Authorization token
     */
    token: string;

    /**
     * Refresh token
     */
    refresh_token: string;
  };
}
