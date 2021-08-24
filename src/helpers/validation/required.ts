export const validationRequired =
  (message: string) =>
  (value: unknown): string => {
    return !value ? message : '';
  };
