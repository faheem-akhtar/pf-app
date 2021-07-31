import { domClassMerge } from 'helpers/dom/class-merge';

import { LoaderTemplatePropsInterface } from './template-props.interface';

import styles from './loader.module.scss';

// TODO-FE[TPNX-2931] move it to the library, it's used in Button
export const LoaderTemplate = (props: LoaderTemplatePropsInterface): JSX.Element => (
  <div className={domClassMerge(styles.dropdownLoader, props.containerCssClass)}>
    <div className={styles.container}>
      <div className={domClassMerge(styles.dot, { [styles.inverted]: !!props.isInverted }, props.dotCssClass)} />
      <div
        className={domClassMerge(
          styles.dot,
          { [styles.inverted]: !!props.isInverted },
          styles.middle,
          props.dotCssClass
        )}
      />
      <div
        className={domClassMerge(styles.dot, { [styles.inverted]: !!props.isInverted }, styles.last, props.dotCssClass)}
      />
    </div>
  </div>
);
