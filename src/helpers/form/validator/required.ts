import { FormFieldValidatorType } from '../field-validator.type';

export const formValidatorRequired = (message: string): FormFieldValidatorType => {
  return {
    getError(value: string): string {
      return !value ? message : '';
    },
  };
};
