import { domClassMerge } from 'helpers/dom/class-merge';
import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';

import styles from './switch.module.scss';
import { SwitchTemplatePropsInterface } from './template-props.interface';

/**
 * Switch allows users to make selections from a list of values.
 *
 * Design: https://www.figma.com/file/gRARY1Vi4W2Ow1vRLw02am/PF_Consumer-Web-Kit?node-id=6%3A1581
 */
export const SwitchTemplate = <V extends unknown>({
  className,
  options,
  selected,
  onCheck,
}: SwitchTemplatePropsInterface<V>): JSX.Element => {
  return (
    <ul className={styles.list}>
      {options.map((option, id) => (
        <li key={id} className={domClassMerge(styles.item, className)}>
          <ButtonTemplate
            type='button'
            componentType={ButtonComponentTypeEnum.tertiary}
            size={ButtonSizeEnum.small}
            className={`${selected === option.value ? styles.activeItem : ''}`}
            onClick={(e): void => onCheck(option, e)}
          >
            {option.label}
          </ButtonTemplate>
        </li>
      ))}
    </ul>
  );
};
