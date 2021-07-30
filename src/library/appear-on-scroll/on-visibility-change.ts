import { appearOnScrollMakeStatusUpdater } from './make-status-updater';

import { AppearOnScrollStatusEnum } from './status.enum';
import { StateUpdater } from 'preact/hooks';

export const appearOnScrollOnVisibilityChange = (
  wrapperIsVisible: boolean,
  setStatus: StateUpdater<AppearOnScrollStatusEnum | null>
): void => {
  if (wrapperIsVisible) {
    setStatus(
      appearOnScrollMakeStatusUpdater({
        afterAnimationStatus: AppearOnScrollStatusEnum.WRAPPER_IN_VIEW,
        animationStatus: AppearOnScrollStatusEnum.EXITING,
        setStatus,
      })
    );
  } else {
    setStatus(
      appearOnScrollMakeStatusUpdater({
        afterAnimationStatus: AppearOnScrollStatusEnum.WRAPPER_OUTSIDE_VIEW,
        animationStatus: AppearOnScrollStatusEnum.ENTERING,
        setStatus,
      })
    );
  }
};
