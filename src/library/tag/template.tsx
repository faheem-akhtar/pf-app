import { FunctionComponent } from 'react';

import { domClassMerge } from 'helpers/dom/class-merge';

import styles from './tag.module.scss';
import { TagTemplatePropsInterface } from './template-props.interface';

export const TagTemplate: FunctionComponent<TagTemplatePropsInterface> = (props) => (
  <div data-testid='tag' className={domClassMerge(styles.tag, props.className)}>
    {props.children}
  </div>
);
