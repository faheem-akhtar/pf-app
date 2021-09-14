import { FunctionComponent } from 'react';

import { IconThickSmallCloseTemplate } from 'components/icon/thick/small-close-template';
import { domClassMerge } from 'helpers/dom/class-merge';

import { TooltipPlacementEnum } from './placement.enum';
import { TooltipTemplatePropsInterface } from './template-props.interface';
import styles from './tooltip.module.scss';

export const TooltipTemplate: FunctionComponent<TooltipTemplatePropsInterface> = ({
  placement = TooltipPlacementEnum.bottom,
  closeIcon = true,
  ...props
}) => {
  return (
    <div
      className={domClassMerge(styles.tooltip, props.className, {
        [styles[`tooltip--${placement}`]]: !!placement,
        [styles[`tooltip--visible`]]: props.visible,
      })}
    >
      <div className={styles.content}>
        <p className={styles.text}>{props.children}</p>

        {closeIcon && (
          <div className={styles.action}>
            <IconThickSmallCloseTemplate class={styles.icon} />
          </div>
        )}
      </div>
    </div>
  );
};
