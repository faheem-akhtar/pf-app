import { ButtonTemplatePropsBaseInterface } from './template-props-base.interface';

export interface ButtonButtonTemplateInterface extends ButtonTemplatePropsBaseInterface {
  /**
   * Type
   */
  type: 'button' | 'submit' | 'reset';
}
