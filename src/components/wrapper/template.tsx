import React from 'react';

import { domClassMerge } from 'helpers/dom/class-merge';

import styles from './template.module.scss';
import { WrapperTemplatePropsInterface } from './template-props.interface';

export const WrapperTemplate = (props: WrapperTemplatePropsInterface): JSX.Element => (
  <div className={domClassMerge(styles.container, props.className)}>{props.children}</div>
);
