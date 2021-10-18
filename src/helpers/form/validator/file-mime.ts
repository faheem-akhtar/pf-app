import { FormFieldValidatorType } from '../field-validator.type';

/**
 * Validate file input field type
 * @param message The error message
 * @param acceptableFileType An array of string with value like 'application/pdf', 'image/jpeg'
 */
export const formValidatorFileMime = (message: string, acceptableFileType: string[]): FormFieldValidatorType => {
  return {
    getError(value: File): string {
      return value?.type && !acceptableFileType.includes(value.type) ? message : '';
    },
  };
};
