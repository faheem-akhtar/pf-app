import { appearOnScrollMakeStatusUpdater } from './make-status-updater';

import { AppearOnScrollStatusEnum } from './status.enum';

export const appearOnScrollOnVisibilityChange = (
  wrapperIsVisible: boolean,
  setStatus: React.Dispatch<React.SetStateAction<AppearOnScrollStatusEnum | null>>
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
