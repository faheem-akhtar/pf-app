import { useState } from 'react';

import { functionSelf } from 'helpers/function/self';
import { AnyValueType } from 'types/any/value.type';

import { FormFieldInterface } from './field.interface';
import { FormFieldValidatorType } from './field-validator.type';

function getError(input: AnyValueType, validators: FormFieldValidatorType[]): string {
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
  const [isDirty, setIsDirty] = useState(false);

  return [
    { value, error, isDirty },
    (newValue): void => {
      const val = refine(newValue);
      setValue(val);
      setIsDirty(true);
      setError(getError(val, validators));
    },
  ];
}
