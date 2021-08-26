import { InputBaseTemplatePropsBaseInterface } from './template-props-base.interface';

export interface InputBaseComponentPropsInterface
  extends Omit<InputBaseTemplatePropsBaseInterface, 'onChange' | 'focus'> {
  /**
   * The signature fn of setState
   */
  onChange: (value: string) => void;
}
