import { AppearOnScrollComponentPropsInterface } from './component-props.interface';
import { AppearOnScrollStatusEnum } from './status.enum';

export const appearOnScrollOnStatusChange = (
  props: Pick<AppearOnScrollComponentPropsInterface, 'onEntering' | 'onExiting' | 'onHidden' | 'onVisible'>,
  status: AppearOnScrollStatusEnum | null
): void => {
  switch (status) {
    case AppearOnScrollStatusEnum.ENTERING:
      props.onEntering && props.onEntering();
      break;
    case AppearOnScrollStatusEnum.EXITING:
      props.onExiting && props.onExiting();
      break;
    case AppearOnScrollStatusEnum.WRAPPER_IN_VIEW:
      props.onHidden && props.onHidden();
      break;
    case AppearOnScrollStatusEnum.WRAPPER_OUTSIDE_VIEW:
      props.onVisible && props.onVisible();
      break;
  }
};
