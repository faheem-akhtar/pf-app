import { UserInterface } from 'components/user/interface';

import { AuthSuccessTypeEnum } from '../success-type.enum';

export interface AuthRegistrationComponentPropsInterface {
  /**
   * On close auth modal
   */
  onClose: () => void;

  /**
   * On success
   */
  onSuccess: (type: AuthSuccessTypeEnum, user: UserInterface) => void;

  /**
   * On login link clicked
   */
  onLogin: () => void;
}
