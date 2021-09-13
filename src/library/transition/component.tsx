import { FunctionComponent } from 'react';
import { CSSTransition } from 'react-transition-group';

import { transitionMapTypeToProps } from './map-type-to-props';
import { TransitionPropsInterface } from './props.interface';

export const TransitionComponent: FunctionComponent<TransitionPropsInterface> = ({ type, children, ...rest }) => (
  <CSSTransition {...transitionMapTypeToProps(type)} {...rest}>
    {children}
  </CSSTransition>
);
