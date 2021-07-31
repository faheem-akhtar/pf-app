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
    image: string;

    /**
     * #s of saved properties
     */
    savedPropertiesCount: number;
  };
}
