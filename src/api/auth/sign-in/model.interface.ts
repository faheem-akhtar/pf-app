import { UserInterface } from 'components/user/interface';

export interface ApiAuthSignInModelInterface {
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
