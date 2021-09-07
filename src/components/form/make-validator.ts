/**
 * Perform input validation through array of validators
 * @param inputs
 * @param validators
 */
export const formMakeValidator =
  <T extends string>(
    error: Record<T, string>,
    setErrors: (errors: Record<T, string>) => void,
    validators: Record<T, Array<(value: string) => string>>
  ) =>
  (inputs: Record<T, string | boolean>): boolean => {
    const errors: Record<T, string> = (Object.keys(inputs) as T[]).reduce((accumulator, fieldName) => {
      const value =
        validators[fieldName]
          .map((validator) => validator(inputs[fieldName] as string))
          .filter((message: string) => message)[0] || null;

      // Remove from errors list
      if (accumulator[fieldName] && !value) {
        delete accumulator[fieldName];
      }

      return {
        ...accumulator,
        ...(value ? { [fieldName]: value } : {}),
      };
    }, error);

    // Update error messages
    setErrors(errors);

    return !!Object.keys(errors).length;
  };
