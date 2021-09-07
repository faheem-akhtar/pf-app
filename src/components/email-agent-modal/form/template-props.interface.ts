import { FormFieldsEnum } from './fields.enum';
import { FormFieldsValueType } from './fields-value.type';
import { TFunctionType } from 'types/t-function/type';

export interface EmailAgentModalFormTemplatePropsInterface {
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
  onSubmit: (e: React.FormEvent) => void;

  /**
   * Translate function
   */
  t: TFunctionType;

  /**
   * Show loading spinner.
   */
  loading: boolean;
}
