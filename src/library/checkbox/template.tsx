import { FunctionComponent } from 'react';

import { domClassMerge } from 'helpers/dom/class-merge';

import styles from './checkbox.module.scss';
import { CheckboxTemplatePropsInterface } from './template-props.interface';

/**
 * Checkbox allows users to select one or more options from the given options.
 *
 * Design: https://www.figma.com/file/gRARY1Vi4W2Ow1vRLw02am/PF_Consumer-Web-Kit?node-id=6%3A1581
 */
export const CheckboxTemplate: FunctionComponent<CheckboxTemplatePropsInterface> = (props): JSX.Element => (
  <div className={domClassMerge(styles.container, props.containerClassName)}>
    <input
      id={props.id}
      name={props.name}
      aria-labelledby={props.name}
      type='checkbox'
      checked={props.checked}
      onChange={props.onChange}
      className={domClassMerge(styles.input, props.inputClassName)}
    />
    <label htmlFor={props.id} className={domClassMerge(styles.label, props.labelClassName)}>
      {props.children}
    </label>
  </div>
);
