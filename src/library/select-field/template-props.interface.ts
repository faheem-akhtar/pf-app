import { SelectFieldOptionInterface } from './option.interface';
export interface SelectFieldTemplatePropsInterface<V> {
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
}
