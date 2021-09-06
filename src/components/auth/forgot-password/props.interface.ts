export interface AuthForgotPasswordPropsInterface {
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
