import { domClassMerge } from 'helpers/dom/class-merge';
import { numberFormat } from 'helpers/number/format';

import { SelectFieldOptionInterface } from './option.interface';
import { SelectFieldTemplatePropsInterface } from './template-props.interface';

import { IconThinChevronDownTemplate } from 'components/icon/thin/chevron-down-template';

import styles from './select-field.module.scss';

export const SelectFieldTemplate = <V extends number | null>({
  className,
  dropdownIcon,
  label,
  onChange,
  value,
  disabled,
  options,
}: SelectFieldTemplatePropsInterface<V>): JSX.Element => {
  const isEmpty = !value && value !== 0;
  const selectedOption = options.find((option) => option.value === value) as SelectFieldOptionInterface<V>;

  return (
    <div className={domClassMerge(styles.container, className)}>
      {label && !isEmpty && <span className={styles.label}>{label}</span>}
      <select
        disabled={disabled}
        className={domClassMerge(styles.field, {
          [styles.fieldEmpty]: isEmpty,
          [styles.fieldWithIcon]: dropdownIcon,
          [styles.fieldFloating]: !!label && !isEmpty,
        })}
        onChange={(e): void => {
          const newIndex = Number((e.target as HTMLSelectElement).value);
          onChange((options[newIndex] as SelectFieldOptionInterface<V>).value);
        }}
        value={options.indexOf(selectedOption)}
      >
        {options.map((option, index) => (
          <option key={index} value={index}>
            {option.value ? numberFormat(option.value) : label}
          </option>
        ))}
      </select>

      {dropdownIcon && <IconThinChevronDownTemplate class={styles.icon} />}
    </div>
  );
};
