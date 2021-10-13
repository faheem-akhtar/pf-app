import { HooksScrollDirectionEnum } from 'hooks/scroll-direction/enum';

import { appearOnScrollMakeStatusUpdater } from './make-status-updater';
import { AppearOnScrollStatusEnum } from './status.enum';

export const appearOnScrollOnVisibilityChange = ({
  wrapperIsVisible,
  setStatus,
  scrollDirection,
  showOnlyOnScrollUp,
}: {
  wrapperIsVisible: boolean;
  setStatus: React.Dispatch<React.SetStateAction<AppearOnScrollStatusEnum | null>>;
  scrollDirection: string | null;
  showOnlyOnScrollUp: boolean;
}): void => {
  if (wrapperIsVisible) {
    setStatus(
      appearOnScrollMakeStatusUpdater({
        afterAnimationStatus: AppearOnScrollStatusEnum.WRAPPER_IN_VIEW,
        animationStatus: AppearOnScrollStatusEnum.EXITING,
        setStatus,
      })
    );
  } else {
    if (showOnlyOnScrollUp && scrollDirection !== HooksScrollDirectionEnum.UP) {
      return;
    }

    setStatus(
      appearOnScrollMakeStatusUpdater({
        afterAnimationStatus: AppearOnScrollStatusEnum.WRAPPER_OUTSIDE_VIEW,
        animationStatus: AppearOnScrollStatusEnum.ENTERING,
        setStatus,
      })
    );
  }
};
