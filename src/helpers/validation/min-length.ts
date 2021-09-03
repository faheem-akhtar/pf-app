export const validationMinLength =
  (message: string, minLength: number) =>
  (value: string): string =>
    value.length < minLength ? message : '';
