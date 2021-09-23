import { TFunctionType } from 'types/t-function/type';

import { FormFieldsEnum } from './fields.enum';
import { FormFieldsValueType } from './fields-value.type';

export interface EmailAgentModalFormComponentPropsInterface {
  /**
   * Fields value
   */
  fieldsValue: FormFieldsValueType;

  /**
   * Fields error
   */
  errors: Partial<Record<FormFieldsEnum, string>>;

  /**
   * Set fields value
   */
  setFieldsValue: (newValue: FormFieldsValueType) => void;

  /**
   * The onsubmit event occurs when a form is submitted.
   */
  onSubmit: (e: React.FormEvent) => Promise<void>;

  /**
   * Translate function
   */
  t: TFunctionType;

  /**
   * Show loading spinner.
   */
  loading: boolean;
}
