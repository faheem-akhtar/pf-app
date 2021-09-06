export interface AuthLoginPropsInterface {
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

  /**
   * On forgot password link clicked
   */
  onForgotPassword: () => void;
}
