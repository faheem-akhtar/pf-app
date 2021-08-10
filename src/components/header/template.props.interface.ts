import { UserModelInterface } from 'services/user/model.interface';

export interface HeaderTemplatePropsInterface {
  /**
   * Locale
   */
  locale: string | undefined;

  /**
   * Fn to trigger when the user click log in button
   */
  onLoginButtonClick: () => void;

  /**
   * User informations
   */
  userProfile?: {
    /**
     * The URL of the user photo
     */
    user: UserModelInterface | null;

    /**
     * #s of saved properties
     */
    savedPropertiesCount: number;
  };
}
