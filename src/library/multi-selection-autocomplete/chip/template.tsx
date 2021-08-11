import { domClassMerge } from 'helpers/dom/class-merge';

import { ChipTemplate } from 'library/chip/template';
import { IconThickSmallCloseTemplate } from 'components/icon/thick/small-close-template';
import { MultiSelectionAutocompleteChipTemplatePropsInterface } from './template-props.interface';

import styles from './multi-selection-autocomplete-chip.module.scss';

export const MultiSelectionAutocompleteChipTemplate = ({
  title,
  onCrossClick,
  className,
}: MultiSelectionAutocompleteChipTemplatePropsInterface): JSX.Element => (
  <ChipTemplate
    label={title}
    isSelected
    className={domClassMerge(styles.container, className)}
    labelClassName={styles.label}
    onClick={(e): void => e.preventDefault()}
    suffixIcon={
      <button
        className={styles.cross_button}
        onClick={(e: MouseEvent): void => {
          e.stopPropagation();
          onCrossClick();
        }}
      >
        <IconThickSmallCloseTemplate class={styles.cross_icon} />
      </button>
    }
  />
);
