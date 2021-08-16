import { FunctionComponent, useState } from 'react';

import { TextFieldComponentPropsInterface } from './component-props.interface';

import { TextFieldTemplate } from './template';

export const TextFieldComponent: FunctionComponent<TextFieldComponentPropsInterface> = ({
  onChange,
  onFocus,
  onBlur,
  value,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  /*
   * Handling input onChange event
   */
  const handleChange = (e: Event): void => {
    const newValue = (e.target as HTMLInputElement).value;
    onChange(newValue);
  };

  /*
   * Handling input onFocus event
   */
  const handleFocus = (e: FocusEvent): void => {
    setIsFocused(true);

    if (onFocus) {
      onFocus(e);
    }
  };

  /*
   * Handling input onBlur event
   */
  const handleBlur = (e: FocusEvent): void => {
    setIsFocused(false);

    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <TextFieldTemplate
      value={value}
      focus={isFocused}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}
    />
  );
};
