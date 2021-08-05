import { domClassMerge } from 'helpers/dom/class-merge';
import styles from './property-card-loading-skeleton.module.scss';

export const PropertyCardLoadingSkeletonTemplate: React.FunctionComponent = () => (
  <div className={styles.container}>
    <div className={domClassMerge(styles.gallery, 'loading')} />
    <div className={styles.content_container}>
      <div className={domClassMerge(styles.row1, 'loading')} />
      <div className={domClassMerge(styles.row2, 'loading')} />
      <div className={domClassMerge(styles.row2, 'loading')} />
      <div className={styles.fill_vertical_space} />
      <div className={styles.cta_buttons_container}>
        <div className={domClassMerge(styles.button, 'loading')} />
        <div className={domClassMerge(styles.button, 'loading')} />
      </div>
    </div>
  </div>
);
