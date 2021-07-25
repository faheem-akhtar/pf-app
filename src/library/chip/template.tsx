import { domClassMerge } from 'helpers/dom/class-merge';

import { ChipPropsInterface } from './props.interface';

import styles from './chip.module.scss';

export const ChipTemplate = (props: ChipPropsInterface): JSX.Element => {
  return (
    <label
      htmlFor={props.htmlFor}
      className={domClassMerge(styles.chip, props.className, {
        [styles.chip_disabled]: props.isDisabled,
        [styles.chip_selected]: props.isSelected,
      })}
      onClick={props.onClick}
    >
      {props.prefixIcon && <span className='chip_prefix'>{props.prefixIcon}</span>}
      {<span className={props.labelClassName}>{props.label}</span>}
      {props.suffixIcon && <span className='chip_suffix'>{props.suffixIcon}</span>}
    </label>
  );
};
