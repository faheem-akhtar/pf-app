import { useState } from 'react';

import { objectReduce } from 'helpers/object/reduce';
import { AnyValueType } from 'types/any/value.type';

import { FormFieldInterface } from './field.interface';
import { FormFieldValidatorType } from './field-validator.type';
import { FormFieldsInterface } from './fields.interface';
import { FormInterface } from './interface';

function getError(input: AnyValueType, validators: FormFieldValidatorType[]): string {
  const errors = validators
    .map((validator: FormFieldValidatorType) => validator.getError(input))
    .filter((message: string) => !!message);

  return errors?.[0] || '';
}

export function useForm<S extends FormFieldInterface['value'], F extends FormFieldsInterface<S>, K extends string>(
  fields: Record<K, F>
): [FormInterface<K>, (field: K, value: S) => void] {
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [formFields, setFormFields] = useState<FormInterface<K>['fields']>(() =>
    objectReduce(
      fields,
      (acc, key, val) => ({
        ...acc,
        [key]: {
          value: val.defaultValue,
          error: '',
          isDirty: false,
        },
      }),
      {} as FormInterface<K>['fields']
    )
  );

  const getFieldError = (field: K, value: S): string => {
    return fields[field]?.validators ? getError(value, fields[field].validators || []) : '';
  };

  const setFormField = (field: K, value: S): void => {
    setIsFormDirty(true);
    setFormFields({ ...formFields, [field]: { error: getFieldError(field, value), isDirty: true, value } });
  };

  return [
    {
      fields: formFields,
      isDirty: isFormDirty,
      isValid: (): boolean => {
        let isFormValid = true;
        const updatedFormFields = objectReduce(
          formFields,
          (acc, key, val) => {
            const error = getFieldError(key, val.value as S);
            isFormValid = isFormValid && error === '';
            acc[key] = {
              ...val,
              error,
            };
            return acc;
          },
          {} as FormInterface<K>['fields']
        );

        setFormFields(updatedFormFields);
        return isFormValid;
      },
    },
    setFormField,
  ];
}
