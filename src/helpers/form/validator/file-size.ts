import { FormFieldValidatorType } from '../field-validator.type';

/**
 * Validate file size
 * @param message The error message
 * @param maxFileSizeInMb Max file size in MB
 */
export const formValidatorFileSize = (message: string, maxFileSizeInMb: number): FormFieldValidatorType => {
  return {
    getError(value: File): string {
      const sizeInMb = (value?.size || 0) / (1024 * 1024);

      return sizeInMb > maxFileSizeInMb ? message : '';
    },
  };
};
