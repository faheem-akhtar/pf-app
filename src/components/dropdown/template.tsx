import { ChangeEvent } from 'react';

import { domClassMerge } from 'helpers/dom/class-merge';
import { useTranslationHook } from 'helpers/hook/translation.hook';

import { DropdownTemplatePropsInterface } from './template-props.interface';
import { FiltersValueFieldChoiceInterface } from 'components/filters/value/field/choice.interface';

import styles from './dropdown.module.scss';

// TODO-FE[TPNX-3056] remove this file
export const DropdownTemplate = <T extends unknown>({
  title,
  value,
  choices,
  onChange,
  className,
}: DropdownTemplatePropsInterface<T>): JSX.Element => {
  const { t } = useTranslationHook();

  return (
    <div className={domClassMerge(className, styles.container)}>
      {title && <span className={styles.title}>{title}</span>}
      <select
        value={String(choices.indexOf(choices.find((c) => c.value === value) as FiltersValueFieldChoiceInterface<T>))}
        onChange={(e): void =>
          onChange(choices[parseInt((e as unknown as ChangeEvent<HTMLSelectElement>).target.value, 10)].value)
        }
      >
        {choices.map((choice, index) => (
          <option key={index} value={index}>
            {choice.label ? choice.label : t('any')}
          </option>
        ))}
      </select>
    </div>
  );
};
