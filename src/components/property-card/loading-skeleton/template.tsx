import { domClassMerge } from 'helpers/dom/class-merge';

import styles from './property-card-loading-skeleton.module.scss';

export const PropertyCardLoadingSkeletonTemplate: React.FunctionComponent = () => (
  <div className={styles.container}>
    <div className={domClassMerge(styles.gallery, 'loading')} />
    <div className={styles.content}>
      <div className={domClassMerge(styles.row1, 'loading')} />
      <div className={domClassMerge(styles.row2, 'loading')} />
      <div className={domClassMerge(styles.row2, 'loading')} />
    </div>
  </div>
);
