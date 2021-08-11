import { ChipsFilterIconPositionEnum } from './icon-position.enum';
import { ChipsFilterTemplatePropsInterface } from './template-props.interface';
import { ChipTemplate } from 'library/chip/template';

import { IconThinCheckmarkTemplate } from 'components/icon/thin/checkmark-template';

import styles from './chips-filter.module.scss';

/**
 * Chip filter allow users to make multiple selections from a list of values.
 *
 * Design: https://www.figma.com/file/gRARY1Vi4W2Ow1vRLw02am/PF_Consumer-Web-Kit?node-id=16%3A781
 */
export const ChipsFilterTemplate = <V extends string>(props: ChipsFilterTemplatePropsInterface<V>): JSX.Element => {
  const {
    options,
    selectedIcon = IconThinCheckmarkTemplate,
    iconPosition = ChipsFilterIconPositionEnum.start,
    containerClassName,
  } = props;
  const Icon = selectedIcon;

  return (
    <ul className={containerClassName ? containerClassName : ''}>
      {options.map((option, id) => {
        const isSelected = !!props.selected.find((value) => value === option.value);

        return (
          <li className={styles.item} key={id}>
            <ChipTemplate
              label={option.label}
              prefixIcon={
                isSelected && iconPosition === ChipsFilterIconPositionEnum.start ? (
                  <Icon class={styles.icon} />
                ) : undefined
              }
              suffixIcon={
                isSelected && iconPosition === ChipsFilterIconPositionEnum.end ? (
                  <Icon class={styles.icon} />
                ) : undefined
              }
              isSelected={isSelected}
              onClick={(e): void => {
                // Check if element already selected
                let newValue: Array<V>;
                if (isSelected) {
                  newValue = props.selected.filter((value) => value !== option.value);
                } else {
                  newValue = [...props.selected, option.value];
                }

                props.onCheck(newValue, e);
              }}
            />
          </li>
        );
      })}
    </ul>
  );
};
