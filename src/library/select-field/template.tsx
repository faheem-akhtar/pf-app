import { IconThinChevronDownTemplate } from 'components/icon/thin/chevron-down-template';
import { domClassMerge } from 'helpers/dom/class-merge';

import { SelectFieldOptionInterface } from './option.interface';
import styles from './select-field.module.scss';
import { SelectFieldTemplatePropsInterface } from './template-props.interface';

export const SelectFieldTemplate = <V extends unknown>({
  className,
  dropdownIcon = true,
  label,
  onChange,
  value,
  disabled,
  options,
  error = false,
  errorText,
  id,
  name,
}: SelectFieldTemplatePropsInterface<V>): JSX.Element => {
  const isEmpty = !value && value !== 0;
  const selectedOption = options.find((option) => option.value === value) as SelectFieldOptionInterface<V>;

  return (
    <div className={domClassMerge(styles.container, className)}>
      {label && !isEmpty && <span className={styles.label}>{label}</span>}
      <div className={styles.fieldWrapper}>
        <select
          id={id}
          name={name}
          disabled={disabled}
          className={domClassMerge(styles.field, {
            [styles.fieldEmpty]: isEmpty,
            [styles.fieldWithIcon]: dropdownIcon,
            [styles.fieldFloating]: !!label && !isEmpty,
            [styles['field--error']]: error,
          })}
          onChange={(e): void => {
            const newIndex = Number((e.target as HTMLSelectElement).value);
            onChange((options[newIndex] as SelectFieldOptionInterface<V>).value);
          }}
          value={options.indexOf(selectedOption)}
        >
          {options.map((option, index) => (
            <option key={index} value={index}>
              {option.label}
            </option>
          ))}
        </select>

        {dropdownIcon && <IconThinChevronDownTemplate class={styles.icon} />}
      </div>
      {error && <span className={styles.errorText}>{errorText}</span>}
    </div>
  );
};
