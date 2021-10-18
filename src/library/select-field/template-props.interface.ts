import { SelectFieldOptionInterface } from './option.interface';
export interface SelectFieldTemplatePropsInterface<V> {
  /**
   * The identifier
   */
  id?: string;

  /**
   * The name attribute
   */
  name?: string;

  /**
   * The selected value
   */
  value: V;

  /**
   * Whether the field is disable or not
   */
  disabled?: boolean;

  /**
   * Additional css classes
   */
  className?: string;

  /**
   * Whether to show dropdown icon or not
   */
  dropdownIcon?: boolean;

  /**
   * A floating label will be displayed when value is empty
   */
  label?: string;

  /**
   * onChange event handler
   */
  onChange: (value: V) => void;

  /**
   * Options
   */
  options: SelectFieldOptionInterface<V>[];

  /**
   * The error text content.
   */
  errorText?: string;
}
