import { UserModelInterface } from 'services/user/model.interface';

export interface AuthModelInterface {
  /**
   * User
   */
  user: UserModelInterface;

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
