import { FunctionComponent } from 'react';

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
  onSuccess: () => void;

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
}
