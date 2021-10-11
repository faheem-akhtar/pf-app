import { FunctionComponent } from 'react';

import { AuthLoginTemplatePropsInterface } from '../login/template-props.interface';
import { AuthScreenEnum } from '../screen.enum';

export interface AuthModalPropsInterface {
  /**
   * The event label for tracking
   */
  eventLabel?: string;

  /**
   * The initial screen to display
   */
  initialScreen?: AuthScreenEnum;

  /**
   * A way to override the login template
   */
  loginTemplate?: FunctionComponent<AuthLoginTemplatePropsInterface>;

  /**
   * On close callback
   */
  close?: () => void;

  /**
   * On cancel callback
   */
  cancel?: () => void;

  /**
   * On success callback
   */
  success?: () => void;
}
