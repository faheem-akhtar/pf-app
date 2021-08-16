import { TextFieldTemplatePropsBaseInterface } from './template-props-base.interface';

export interface TextFieldComponentPropsInterface
  extends Omit<TextFieldTemplatePropsBaseInterface, 'onChange' | 'focus'> {
  /**
   * The signature fn of setState
   */
  onChange: (value: string) => void;
}
