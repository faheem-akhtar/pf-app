export interface CheckboxTemplatePropsInterface {
  /**
   * Id attribute value to be added to the input element and as a label's for attribute value.
   */
  id?: string;

  /**
   * Name attribute
   */
  name?: string;

  /**
   * Renders component in checked state.
   */
  checked: boolean;

  /**
   * Additional css classes for for the container
   */
  containerClassName?: string;

  /**
   * Additional css classes for for the input
   */
  inputClassName?: string;

  /**
   * Additional css classes for for the label
   */
  labelClassName?: string;

  /**
   * Called when checkbox value is changed.
   */
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}
