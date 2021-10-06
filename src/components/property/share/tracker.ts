import { AnalyticsGaService } from 'services/analytics/ga.service';

import { PropertyShareTrackerPlatformType } from './tracker-platform.type';

export const propertyShareTracker = {
  /**
   * Trigger when user click on individual social share cta buttons
   */
  onClickSocialShare: (platform: PropertyShareTrackerPlatformType): void => {
    AnalyticsGaService.send({
      event: 'User Interaction',
      eventAction: `Click:${platform} Share`,
      eventLabel: 'Social Sharing',
    });
  },

  /**
   * Trigger when shared via email was successful
   */
  onSuccessSocialShare: (platform: 'Email'): void => {
    AnalyticsGaService.send({
      event: 'User Interaction',
      eventAction: `Finish:${platform} Share`,
      eventLabel: 'Social Sharing',
    });
  },
};
