import { AuthSuccessTypeEnum } from '../success-type.enum';

export interface AuthRegistrationPropsInterface {
  /**
   * On close auth modal
   */
  onClose: () => void;

  /**
   * On success
   */
  onSuccess: (type: AuthSuccessTypeEnum) => void;

  /**
   * On login link clicked
   */
  onLogin: () => void;
}
