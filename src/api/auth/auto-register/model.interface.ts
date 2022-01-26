import { UserInterface } from 'components/user/interface';

export interface ApiAuthAutoRegisterModelInterface {
  /**
   * User
   */
  user: UserInterface;

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
