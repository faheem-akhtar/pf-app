import { FunctionComponent } from 'react';

import { IconThickSmallCloseTemplate } from 'components/icon/thick/small-close-template';
import { domClassMerge } from 'helpers/dom/class-merge';

import styles from './on-boarding.module.scss';
import { OnBoardingTemplatePropsInterface } from './template-props.interface';

export const OnBoardingTemplate: FunctionComponent<OnBoardingTemplatePropsInterface> = (props): JSX.Element => (
  <div
    ref={props.rootRef}
    className={domClassMerge(styles.container, props.className, {
      [styles[`container--${props.placement}`]]: !!props.placement,
      [styles['container--visible']]: props.visible,
    })}
  >
    <div className={styles.content}>
      <div className={domClassMerge(styles.arrow, props.arrowClassName)} />
      <div className={styles.inner} role='tooltip'>
        <span>{props.children}</span>
      </div>

      <div className={styles.action} onClick={props.onClose}>
        <IconThickSmallCloseTemplate class={styles.icon} />
      </div>
    </div>
  </div>
);
