import { FunctionComponent, useState } from 'react';

import { InputBaseComponentPropsInterface } from './component-props.interface';
import { InputBaseTemplate } from './template';
import { InputBaseTemplatePropsBaseInterface } from './template-props-base.interface';

export const InputBaseComponent: FunctionComponent<InputBaseComponentPropsInterface> = ({
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
  const handleChange: InputBaseTemplatePropsBaseInterface['onChange'] = (e) => {
    const newValue = (e.target as HTMLInputElement).value;
    onChange(newValue);
  };

  /*
   * Handling input onFocus event
   */
  const handleFocus: InputBaseTemplatePropsBaseInterface['onFocus'] = (e) => {
    setIsFocused(true);

    if (onFocus) {
      onFocus(e as React.FocusEvent<HTMLInputElement>);
    }
  };

  /*
   * Handling input onBlur event
   */
  const handleBlur: InputBaseTemplatePropsBaseInterface['onBlur'] = (e) => {
    setIsFocused(false);

    if (onBlur) {
      onBlur(e as React.FocusEvent<HTMLInputElement>);
    }
  };

  return (
    <InputBaseTemplate
      value={value}
      focus={isFocused}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...rest}
    />
  );
};
