import { FunctionComponent } from 'react';

import { UserModelInterface } from 'services/user/model.interface';

import { AuthSuccessTypeEnum } from '../success-type.enum';
import { AuthLoginTemplatePropsInterface } from './template-props.interface';

export interface AuthLoginPropsInterface {
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
  onSuccess: (type: AuthSuccessTypeEnum, user: UserModelInterface) => void;

  /**
   * On registration link clicked
   */
  onRegister: () => void;

  /**
   * On login link clicked
   */
  onLogin?: () => void;

  /**
   * On forgot password link clicked
   */
  onForgotPassword: () => void;

  /**
   * When user click on login with facebook
   */
  onFacebookLoginStart?: () => void;

  /**
   * When user click on login with google
   */
  onGoogleLoginStart?: () => void;
}
