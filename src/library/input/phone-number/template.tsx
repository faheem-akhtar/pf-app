import { domClassMerge } from 'helpers/dom/class-merge';
import { phoneNumberCountryGetConfig } from './country/get-config';

import { IconThinChevronDownTemplate } from 'components/icon/thin/chevron-down-template';

import { CountryPhoneCodesInterface } from 'types/country-phone-codes/interface';
import { InputBaseComponent } from 'library/input/base/component';
import { InputPhoneNumberCountryFlagTemplate } from './country/flag/template';
import { InputPhoneNumberTemplatePropsInterface } from './template-props.interface';

import styles from './input-phone-number.module.scss';

export const InputPhoneNumberTemplate = (props: InputPhoneNumberTemplatePropsInterface): JSX.Element => {
  const config = phoneNumberCountryGetConfig(props.value, props.countryList);

  return (
    <InputBaseComponent
      {...props}
      onChange={(newValue): void => props.onChange(`${config.phoneCode}${newValue}`)}
      value={props.value.replace(config.phoneCode, '')}
      floatPlaceholder={false}
      maxLength={12}
      prefix={
        <div
          ref={props.rootRef}
          className={domClassMerge(styles.container, {
            [styles[`container--error`]]: props.error,
            [styles[`container--focus`]]: props.focus,
          })}
          onClick={props.onClickToggle}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          tabIndex={0}
          role='button'
        >
          <div className={styles.body}>
            <div className={styles.content}>
              <InputPhoneNumberCountryFlagTemplate countryCode={config.code} />
              <span>{config.phoneCode}</span>
            </div>

            <IconThinChevronDownTemplate
              class={domClassMerge(styles.icon, {
                [styles[`icon--active`]]: props.visible,
              })}
              clipped
            />
          </div>

          <ul
            className={domClassMerge(styles.list, {
              [styles[`list--visible`]]: props.visible,
            })}
          >
            {props.countryList.map((option: CountryPhoneCodesInterface, i) => (
              <li
                key={i}
                className={styles.item}
                onClick={(): void => {
                  if (!props.value) {
                    props.onChange(option.phoneCode);
                    return;
                  }

                  props.onChange(props.value.replace(config.phoneCode, option.phoneCode));
                }}
              >
                <InputPhoneNumberCountryFlagTemplate countryCode={option.code} />
                {option.name} <span className={styles.phoneCode}>({option.phoneCode})</span>
              </li>
            ))}
          </ul>
        </div>
      }
    />
  );
};
