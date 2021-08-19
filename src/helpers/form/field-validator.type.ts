export type FormFieldValidatorType = {
  /**
   * Get error message if @value is invalid within @context
   *
   * @param value   - value being validated
   */
  getError(value: unknown): string;
};
