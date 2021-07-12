import { domClassMerge } from 'helper/dom/class-merge';
import { FunctionalComponent } from 'preact';
import styles from './loader.module.scss';

export const LoaderTemplate: FunctionalComponent<{
  cssClass?: string;
  isInverted?: boolean;
}> = (props) => (
  <div className={domClassMerge(styles.dropdownLoader, props.cssClass)}>
    <div className={styles.container}>
      <div className={domClassMerge(styles.dot, { [styles.inverted]: !!props.isInverted })} />
      <div className={domClassMerge(styles.dot, { [styles.inverted]: !!props.isInverted }, styles.middle)} />
      <div className={domClassMerge(styles.dot, { [styles.inverted]: !!props.isInverted }, styles.last)} />
    </div>
  </div>
);
