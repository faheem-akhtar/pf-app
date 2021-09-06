export interface AuthRegistrationPropsInterface {
  /**
   * On close auth modal
   */
  onClose: () => void;

  /**
   * On success
   */
  onSuccess: () => void;

  /**
   * On login link clicked
   */
  onLogin: () => void;
}
