import { UserModelInterface } from 'services/user/model.interface';

export interface ApiAuthAutoRegisterModelInterface {
  /**
   * First name
   */
  first_name: string;

  /**
   * Last name
   */
  last_name: string;

  /**
   * Email
   */
  email: string;

  /**
   * Phone
   */
  phone: string;

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
