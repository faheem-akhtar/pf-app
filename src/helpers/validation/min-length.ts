/**
 * @param message The error message of the field
 * @param minLength The acceptable minimum character length
 * @param value The value of the field
 */
export const validationMinLength =
  (message: string, minLength: number) =>
  (value: string): string =>
    value.length < minLength ? message : '';
