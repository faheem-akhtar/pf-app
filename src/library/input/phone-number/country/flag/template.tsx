import { FunctionComponent } from 'react';

import { domClassMerge } from 'helpers/dom/class-merge';

import styles from './input-phone-number-country-flag.module.scss';

export const InputPhoneNumberCountryFlagTemplate: FunctionComponent<{ countryCode: string }> = (props) => (
  <div
    className={domClassMerge(styles.countryFlag, {
      [styles[`countryFlag--${props.countryCode}`]]: !!props.countryCode,
    })}
  />
);
