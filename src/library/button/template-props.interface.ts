import { ButtonTemplatePropsBaseInterface } from './template-props-base.interface';

export interface ButtonTemplatePropsInterface extends ButtonTemplatePropsBaseInterface {
  /**
   * Type
   */
  type: 'button' | 'submit' | 'reset';
}
