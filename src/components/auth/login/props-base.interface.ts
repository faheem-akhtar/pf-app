export interface AuthLoginPropsBaseInterface {
  /**
   * On login link clicked
   */
  onLogin?: () => void;

  /**
   * On forgot password link clicked
   */
  onForgotPassword: () => void;

  /**
   * On registration link clicked
   */
  onRegister: () => void;
}
