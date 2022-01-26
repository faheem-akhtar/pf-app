import { TFunctionType } from 'helpers/t-function/type';

export type EmailAgentModalFormWidgetPropsType<V> = {
  /**
   * Input value attribute.
   */
  value: V;

  /**
   * Input's value error content
   */
  error?: string;

  /**
   * Called when input value is changed.
   */
  onChange: (value: V) => void;

  /**
   * Translate function
   */
  t: TFunctionType;
};
