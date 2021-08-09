export interface CheckboxTemplatePropsInterface {
  /**
   * Id for the input
   */
  id: string;

  /**
   * Checked status
   */
  checked: boolean;

  /**
   * onChange event handler
   */
  onChange: (e: Event) => void;

  /**
   * Children
   */
  children: React.ReactNode;

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
}
