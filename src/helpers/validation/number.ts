export const validationNumber =
  (message: string) =>
  (value: number): string => {
    return isNaN(value) ? message : '';
  };
