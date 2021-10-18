import { FormFieldValidatorType } from '../field-validator.type';

export const formValidatorMaxLength = (
  message: string,
  maxLength: number,
  inclusive: boolean = false
): FormFieldValidatorType => {
  return {
    getError(value: string): string {
      const errorMessage = message.replace('{{max-length}}', String(maxLength));

      if (inclusive) {
        return value.length >= maxLength ? errorMessage : '';
      }

      return value.length > maxLength ? errorMessage : '';
    },
  };
};
