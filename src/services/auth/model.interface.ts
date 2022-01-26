import { UserInterface } from 'components/user/interface';

export interface AuthModelInterface {
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
