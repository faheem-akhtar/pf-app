import { FunctionComponent, useState } from 'react';

import { TextFieldComponentPropsInterface } from './component-props.interface';
import { TextFieldTemplate } from './template';
import { TextFieldTemplatePropsBaseInterface } from './template-props-base.interface';

export const TextFieldComponent: FunctionComponent<TextFieldComponentPropsInterface> = ({
  onChange,
  onFocus,
  onBlur,
  value,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  /*
   * Handling input onChange event
   */
  const handleChange: TextFieldTemplatePropsBaseInterface['onChange'] = (e) => {
    const newValue = (e.target as HTMLInputElement).value;
    onChange(newValue);
  };

  /*
   * Handling input onFocus event
   */
  const handleFocus: TextFieldTemplatePropsBaseInterface['onFocus'] = (e) => {
    setIsFocused(true);

    if (onFocus) {
      onFocus(e as React.FocusEvent<HTMLInputElement>);
    }
  };

  /*
   * Handling input onBlur event
   */
  const handleBlur: TextFieldTemplatePropsBaseInterface['onBlur'] = (e) => {
    setIsFocused(false);

    if (onBlur) {
      onBlur(e as React.FocusEvent<HTMLInputElement>);
    }
  };

  return (
    <TextFieldTemplate
      value={value}
      focus={isFocused}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...rest}
    />
  );
};
