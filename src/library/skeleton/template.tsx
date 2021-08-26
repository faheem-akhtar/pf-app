import { FunctionComponent } from 'react';

import { domClassMerge } from 'helpers/dom/class-merge';

import styles from './skeleton.module.scss';

export const SkeletonTemplate: FunctionComponent<{ className?: string }> = (props): JSX.Element => {
  return <div className={domClassMerge(styles.container, props.className)} />;
};
