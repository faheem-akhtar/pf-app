import { FormFieldValidatorType } from '../field-validator.type';

export const formValidatorMinLength = (
  message: string,
  minLength: number,
  inclusive: boolean = false
): FormFieldValidatorType => {
  return {
    getError(value: string): string {
      if (inclusive) {
        return value.length <= minLength ? message : '';
      }

      return value.length < minLength ? message : '';
    },
  };
};
