import { FormFieldInterface } from './field.interface';

export interface FormInterface<F extends string> {
  /**
   * Form fields
   */
  fields: Record<F, FormFieldInterface>;

  /**
   * True if form got touched (modified)
   */
  isDirty: boolean;

  /**
   * Is form valid. Form is valid if all the form fields are valid
   */
  isValid: () => boolean;
}
