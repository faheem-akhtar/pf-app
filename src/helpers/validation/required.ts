/**
 * @param message The error message of the field
 * @param value The value of the field
 */
export const validationRequired =
  (message: string) =>
  (value: unknown): string => {
    return !value ? message : '';
  };
