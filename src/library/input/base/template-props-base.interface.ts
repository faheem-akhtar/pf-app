export interface InputBaseTemplatePropsBaseInterface {
  /**
   * The type of input
   * @default text
   */
  type?: 'email' | 'password' | 'text';

  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder?: string;

  /**
   * extra css class for input
   */
  inputClassName?: string;

  /**
   * extra css class
   */
  className?: string;

  /**
   * Whether placeholder is floatable or not
   * @default true
   */
  floatPlaceholder?: boolean;

  /**
   * Input value attribute
   */
  value: string;

  /**
   * An input helper rendered before and attached to the input field.
   */
  prefix?: React.ReactNode;

  /**
   * If `true`, the component is TextArea.
   * @default false
   */
  textarea?: boolean;

  /**
   * If `true`, the label is displayed in an error state.
   * @default false
   */
  error?: boolean;

  /**
   * The error text content.
   */
  errorText?: string;

  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * If `true`, the component is focused.
   * @default false
   */
  focus: boolean;

  /**
   * The helper text content.
   */
  helperText?: React.ReactNode;

  /**
   * Max number of characters accepted in the input element
   */
  maxLength?: number;

  /**
   * Called when input value is changed
   */
  onChange: React.ChangeEventHandler<HTMLInputElement>;

  /**
   * Called the onBlur event triggers.
   */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;

  /**
   * Called the onFocus event triggers.
   */
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
}
