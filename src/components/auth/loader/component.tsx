import { domClassMerge } from 'helpers/dom/class-merge';

import styles from './auth-loader.module.scss';

export const AuthLoaderComponent = ({
  isEnabled,
  isCentered,
}: {
  isEnabled: boolean;
  isCentered: boolean;
}): JSX.Element | null =>
  isEnabled ? (
    <div className={styles.loader1}>
      <div
        className={domClassMerge(styles['loader1__spinner'], isCentered ? styles['loader1__spinner--centered'] : '')}
      >
        <div className={domClassMerge(styles['loader1__bounce'], styles['loader1__bounce--1'])} />
        <div className={domClassMerge(styles['loader1__bounce'], styles['loader1__bounce--2'])} />
        <div className={domClassMerge(styles['loader1__bounce'], styles['loader1__bounce--3'])} />
      </div>
    </div>
  ) : null;
