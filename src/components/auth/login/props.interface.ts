import { FunctionComponent } from 'react';

import { UserInterface } from 'components/user/interface';

import { AuthSuccessTypeEnum } from '../success-type.enum';
import { AuthLoginPropsBaseInterface } from './props-base.interface';
import { AuthLoginTemplatePropsInterface } from './template-props.interface';

export interface AuthLoginPropsInterface extends AuthLoginPropsBaseInterface {
  /**
   * Template for the component
   */
  template?: FunctionComponent<AuthLoginTemplatePropsInterface>;

  /**
   * On close auth modal
   */
  onClose: () => void;

  /**
   * On success
   */
  onSuccess: (type: AuthSuccessTypeEnum, user: UserInterface) => void;

  /**
   * When user click on login with facebook
   */
  onFacebookLoginStart?: () => void;

  /**
   * When user click on login with google
   */
  onGoogleLoginStart?: () => void;
}
