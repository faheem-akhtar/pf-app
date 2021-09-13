/**
 * @param message The error message of the field
 * @param value The value of the field
 */
export const validationEmail =
  (message: string) =>
  (value: string): string => {
    return !value.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    )
      ? message
      : '';
  };
