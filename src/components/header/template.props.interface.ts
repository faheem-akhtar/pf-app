import { UserInterface } from 'components/user/interface';

import { HeaderPropsBaseInterface } from './props-base.interface';

export interface HeaderTemplatePropsInterface extends HeaderPropsBaseInterface {
  /**
   * Locale
   */
  locale: string;

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
    user: UserInterface | null;

    /**
     * #s of saved properties
     */
    savedPropertiesCount: number;
  };
}
