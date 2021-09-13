import { useState } from 'react';

import { functionSelf } from 'helpers/function/self';

import { FormFieldInterface } from './field.interface';
import { FormFieldValidatorType } from './field-validator.type';

function getError(input: string | number | boolean, validators: FormFieldValidatorType[]): string {
  const errors = validators
    .map((validator: FormFieldValidatorType) => validator.getError(input))
    .filter((message: string) => !!message);

  return errors?.[0] || '';
}

export function useFormField<S extends FormFieldInterface['value']>(
  initialState: S,
  validators: FormFieldValidatorType[] = [],
  refine: (value: S) => S = functionSelf
): [FormFieldInterface<S>, (value: S) => void] {
  const [value, setValue] = useState<S>(initialState);
  const [error, setError] = useState('');

  return [
    { value, error },
    (newValue): void => {
      const val = refine(newValue);
      setValue(val);
      setError(getError(val, validators));
    },
  ];
}
