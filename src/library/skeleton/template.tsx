import { FunctionComponent } from 'react';

import { domClassMerge } from 'helpers/dom/class-merge';

import styles from './skeleton.module.scss';
import { SkeletonTemplatePropsInterface } from './template-props.interface';

export const SkeletonTemplate: FunctionComponent<SkeletonTemplatePropsInterface> = (props) => (
  <div
    data-testid='skeleton-template'
    style={{ width: props.width, height: props.height }}
    className={domClassMerge(styles.container, props.class)}
  />
);
