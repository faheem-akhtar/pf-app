export interface TextFieldTemplatePropsBaseInterface {
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
   * Whether placeholder is floatable or not
   * @default true
   */
  floatPlaceholder?: boolean;

  /**
   * The input content value.
   */
  value?: string;

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
   * onChange event handler
   */
  onChange: React.ChangeEventHandler<HTMLInputElement>;

  /**
   * onBlur event handler
   */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;

  /**
   * onFocus event handler
   */
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
}
