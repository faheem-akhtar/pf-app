import { FormEvent } from 'react';

import { TFunctionType } from 'types/t-function/type';

import { AuthLoginFieldEnum } from './field.enum';
import { AuthLoginPropsInterface } from './props.interface';

export interface AuthLoginTemplatePropsInterface
  extends Pick<AuthLoginPropsInterface, 'onForgotPassword' | 'onRegister' | 'onLogin'> {
  /**
   * Is loading state
   */
  isLoading: boolean;

  /**
   * The error message if any
   */
  errorMessage: string;

  /**
   * Email value
   */
  email: string;

  /**
   * Password value
   */
  password: string;

  /**
   * Form field errors
   */
  errors: Partial<Record<AuthLoginFieldEnum, string>>;

  /**
   * Translate function
   */
  t: TFunctionType;

  /**
   * On email change
   */
  onEmailChange: (value: string) => void;

  /**
   * On password change
   */
  onPasswordChange: (value: string) => void;

  /**
   * On login with facebook click
   */
  onFacebookLoginClick: () => void;

  /**
   * On login with google click
   */
  onGoogleLoginClick: () => void;

  /**
   * On form submit
   */
  onFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
}
