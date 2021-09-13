import { domClassMerge } from 'helpers/dom/class-merge';

import styles from './checkbox.module.scss';
import { CheckboxTemplatePropsInterface } from './template-props.interface';

/**
 * Checkbox allows users to select one or more options from the given options.
 *
 * Design: https://www.figma.com/file/gRARY1Vi4W2Ow1vRLw02am/PF_Consumer-Web-Kit?node-id=6%3A1581
 */
export const CheckboxTemplate = (props: CheckboxTemplatePropsInterface): JSX.Element => (
  <div className={domClassMerge(styles.container, props.containerClassName)}>
    <input
      id={props.id}
      type='checkbox'
      className={domClassMerge(styles.input, props.inputClassName)}
      checked={props.checked}
      onChange={props.onChange}
    />
    <label htmlFor={props.id} className={domClassMerge(styles.label, props.labelClassName)}>
      {props.children}
    </label>
  </div>
);
