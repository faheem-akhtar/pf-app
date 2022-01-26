export interface AuthForgotPasswordComponentPropsInterface {
  /**
   * On close auth modal
   */
  onClose: () => void;

  /**
   * On success
   */
  onSuccess: () => void;

  /**
   * On registration link clicked
   */
  onRegister: () => void;
}
