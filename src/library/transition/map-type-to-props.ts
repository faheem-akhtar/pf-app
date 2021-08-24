import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
import { TransitionTypeEnum } from './type.enum';

import styles from './transition.module.scss';

/**
 * Map the transition types to the props
 */
export const transitionMapTypeToProps = (type: TransitionTypeEnum): CSSTransitionProps =>
  ((
    {
      [TransitionTypeEnum.slideUp]: {
        classNames: {
          appear: styles['transition-slide-up-appear'],
          appearActive: styles['transition-slide-up-appear-active'],
          appearDone: styles['transition-slide-up-appear-done'],
          enter: styles['transition-slide-up-enter'],
          enterActive: styles['transition-slide-up-enter-active'],
          enterDone: styles['transition-slide-up-enter-done'],
          exit: styles['transition-slide-up-exit'],
          exitActive: styles['transition-slide-up-exit-active'],
          exitDone: styles['transition-slide-up-exit-done'],
        },
        unmountOnExit: true,
        mountOnEnter: true,
        appear: true,
        timeout: 700,
      },
    } as Record<TransitionTypeEnum, CSSTransitionProps>
  )[type]);
