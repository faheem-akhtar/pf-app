import { UserInterface } from 'components/user/interface';

export interface ApiAuthSocialLoginModelInterface {
  /**
   * Email
   */
  email: string;

  /**
   * User
   */
  user: UserInterface;

  /**
   * @inheritDoc
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
