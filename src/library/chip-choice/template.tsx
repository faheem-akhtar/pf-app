import { useTranslationHook } from 'helpers/hook/translation.hook';

import { ChipChoiceTemplatePropsInterface } from './template-props.interface';
import { ChipTemplate } from '../chip/template';

import styles from './chip-choice.module.scss';

/**
 * Chip choice allows users to make selections from a list of values.
 *
 * Design: https://www.figma.com/file/gRARY1Vi4W2Ow1vRLw02am/PF_Consumer-Web-Kit?node-id=16%3A781
 */
export const ChipChoiceTemplate = <V extends unknown>(props: ChipChoiceTemplatePropsInterface<V>): JSX.Element => {
  const { t } = useTranslationHook();
  const { placeholder = t('any') as string } = props;

  return (
    <ul className={props.containerClassName || ''}>
      {props.options.map((option, id) => (
        <li key={id} className={styles.item}>
          <ChipTemplate
            label={option.label ? option.label : placeholder}
            className={props.chipClassName}
            isSelected={props.selected === option.value}
            onClick={(e): void => {
              props.onCheck(option, e);
            }}
          />
        </li>
      ))}
    </ul>
  );
};
