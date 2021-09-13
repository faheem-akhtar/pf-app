import { TimeService } from 'services/time/service';

import { AppearOnScrollStatusEnum } from './status.enum';

export const appearOnScrollMakeStatusUpdater =
  (props: {
    afterAnimationStatus: AppearOnScrollStatusEnum;
    animationStatus: AppearOnScrollStatusEnum;
    setStatus: React.Dispatch<React.SetStateAction<AppearOnScrollStatusEnum | null>>;
  }) =>
  (status: AppearOnScrollStatusEnum | null): AppearOnScrollStatusEnum | null => {
    // If the status is not yet reached final destination, set status to play animation
    // and then after animation finished set status to final destination
    if (status !== props.afterAnimationStatus) {
      TimeService.setTimeout(() => {
        props.setStatus(props.afterAnimationStatus);
      }, 200);
      return props.animationStatus;
    }

    return status;
  };
