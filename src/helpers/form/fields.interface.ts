import { FormFieldValidatorType } from './field-validator.type';

export interface FormFieldsInterface<V> {
  /**
   * The default value
   */
  defaultValue: V;

  /**
   * Array of validators
   */
  validators?: FormFieldValidatorType[];
}
