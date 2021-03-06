import React, { FunctionComponent, useRef, useState } from 'react';

import { useApiCountryPhoneCodes } from 'api/country-phone-codes/hook';
import { CountrySortEnum } from 'enums/country/sort.enum';
import { useWindowMouseDown } from 'helpers/window/mouse-down.hook';
import { SkeletonTemplate } from 'library/skeleton/template';

import { InputBaseTemplatePropsBaseInterface } from '../base/template-props-base.interface';
import { InputPhoneNumberComponentPropsInterface } from './component-props.interface';
import { InputPhoneNumberTemplate } from './template';

export const InputPhoneNumberComponent: FunctionComponent<InputPhoneNumberComponentPropsInterface> = ({
  onBlur,
  onFocus,
  ...rest
}): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const rootRef = useRef(null);
  const countriesListResponse = useApiCountryPhoneCodes(CountrySortEnum.priority);
  const countryList = countriesListResponse.ok ? countriesListResponse.data : [];

  useWindowMouseDown({
    shouldListen: isVisible,
    ignoreElementRef: rootRef,
    onWindowMouseDown: () => {
      setIsVisible(false);
    },
  });

  const onClickToggle = (): void => setIsVisible(!isVisible);

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

  if (!countryList.length) return <SkeletonTemplate width='100%' height='4.8rem' />;

  return (
    <InputPhoneNumberTemplate
      onClickToggle={onClickToggle}
      visible={isVisible}
      rootRef={rootRef}
      onFocus={handleFocus}
      onBlur={handleBlur}
      focus={isFocused}
      countryList={countryList}
      {...rest}
    />
  );
};
