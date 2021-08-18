import { domClassMerge } from 'helpers/dom/class-merge';

import { AppearOnScrollStatusEnum } from './status.enum';
import { AppearOnScrollTemplatePropsInterface } from './template-props.interface';

import styles from './appear-on-scroll.module.scss';

const classByStatus = {
  [AppearOnScrollStatusEnum.ENTERING]: styles.appear_on_scroll__entering,
  [AppearOnScrollStatusEnum.EXITING]: styles.appear_on_scroll__exiting,
  [AppearOnScrollStatusEnum.WRAPPER_IN_VIEW]: styles.appear_on_scroll__hidden,
  [AppearOnScrollStatusEnum.WRAPPER_OUTSIDE_VIEW]: styles.appear_on_scroll__visible,
};

export const AppearOnScrollTemplate = ({
  status,
  className,
  children,
}: AppearOnScrollTemplatePropsInterface): JSX.Element => (
  <div
    data-testid='AppearOnScrollTemplate'
    className={domClassMerge(styles.appear_on_scroll, classByStatus[status as AppearOnScrollStatusEnum], className)}
  >
    {children}
  </div>
);
