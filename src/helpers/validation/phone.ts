/**
 * @param message The error message of the field
 * @param value The value of the field
 */
export const validationPhone =
  (message: string) =>
  (value: string): string => {
    // Remove all spaces to check only number
    value = value.replace(/\s+/g, '');

    return !value.match(/^\+?[\d]{8,15}$/) ? message : '';
  };
