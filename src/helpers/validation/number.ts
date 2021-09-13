/**
 * @param message The error message of the field
 * @param value The value of the field
 */
export const validationNumber =
  (message: string) =>
  (value: number): string => {
    return isNaN(value) ? message : '';
  };
