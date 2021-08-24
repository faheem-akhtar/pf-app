/**
 * Perform input validation through array of validators
 * @param inputs
 * @param validators
 */
export const formMakeValidator =
  <T extends string>(
    setErrors: (errors: Record<T, string>) => void,
    validators: Record<T, Array<(value: string) => string>>
  ) =>
  (inputs: Record<T, string>): boolean => {
    const errors: Record<T, string> = (Object.keys(inputs) as T[]).reduce((accumulator, fieldName) => {
      const value =
        validators[fieldName]
          .map((validator) => validator(inputs[fieldName] as string))
          .filter((message: string) => message)[0] || null;

      return {
        ...accumulator,
        ...(value ? { [fieldName]: value } : {}),
      };
    }, {} as Record<T, string>);

    // Update error messages
    setErrors(errors);

    return !!Object.keys(errors).length;
  };
