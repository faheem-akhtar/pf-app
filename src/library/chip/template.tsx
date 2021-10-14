import { domClassMerge } from 'helpers/dom/class-merge';

import styles from './chip.module.scss';
import { ChipTemplatePropsInterface } from './template-props.interface';

export const ChipTemplate = (props: ChipTemplatePropsInterface): JSX.Element => {
  return (
    <label
      htmlFor={props.htmlFor}
      className={domClassMerge(styles.chip, props.className, {
        [styles.chip_disabled]: props.isDisabled,
        [styles.chip_selected]: props.isSelected,
      })}
      onClick={props.onClick}
    >
      {props.prefixIcon && <span className={styles.chipPrefix}>{props.prefixIcon}</span>}
      {<span className={domClassMerge(styles.chipLabel, props.labelClassName)}>{props.label}</span>}
      {props.suffixIcon && <span className={styles.chipSuffix}>{props.suffixIcon}</span>}
    </label>
  );
};
