import { AnyValueType } from 'types/any/value.type';

export interface FormFieldInterface<T extends AnyValueType = AnyValueType> {
  /**
   * The field value
   */
  value: T;

  /**
   * The error message
   */
  error?: string;

  /**
   * Becomes dirty once you change the value
   */
  isDirty: boolean;
}
