import { UserModelInterface } from 'services/user/model.interface';

import { AuthSuccessTypeEnum } from '../success-type.enum';

export interface AuthRegistrationPropsInterface {
  /**
   * On close auth modal
   */
  onClose: () => void;

  /**
   * On success
   */
  onSuccess: (type: AuthSuccessTypeEnum, user: UserModelInterface) => void;

  /**
   * On login link clicked
   */
  onLogin: () => void;
}
