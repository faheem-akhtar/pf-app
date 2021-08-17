import { UserModelInterface } from 'services/user/model.interface';

export interface ApiAuthRegisterModelInterface {
  /**
   * First name
   */
  first_name: string;

  /**
   * Last name
   */
  last_name: string;

  /**
   * Captcha token
   */
  captcha_token: string;

  /**
   * Did user allow us to use email for marketing purposes?
   */
  opted_in: boolean;

  /**
   * Email
   */
  email: string;

  /**
   * Password
   */
  password: string;

  /**
   * Is agreed with first conditional?
   */
  termsAndConditions: boolean;

  /**
   * Is agreed with using ther email?
   */
  useEmail: boolean;

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
