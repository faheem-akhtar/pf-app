export interface FormFieldInterface<T extends string = string> {
  /**
   * The field value
   */
  value: T;

  /**
   * The error message
   */
  error?: string;
}
