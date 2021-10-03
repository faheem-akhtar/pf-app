import { AnalyticsGaService } from 'services/analytics/ga.service';

export const savedPropertyTracker = {
  /**
   * Trigger when user login modal open
   */
  onOpenUserAuthModal: (): void => {
    AnalyticsGaService.send({
      event: 'User Interaction',
      eventAction: 'Impression:Login to see saved properties',
    });
  },
};
