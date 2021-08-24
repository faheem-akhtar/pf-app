import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
import { TransitionTypeEnum } from './type.enum';

export interface TransitionPropsInterface extends Omit<CSSTransitionProps, 'classNames'> {
  /**
   * Type of transition
   */
  type: TransitionTypeEnum;
}
