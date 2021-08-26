export interface AuthLoginPropsInterface {
  /**
   * On close auth modal
   */
  onClose: () => void;

  /**
   * On registration link clicked
   */
  onRegister: () => void;

  /**
   * On forgot password link clicked
   */
  onForgotPassword: () => void;
}
