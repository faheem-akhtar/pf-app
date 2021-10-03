import { AnalyticsGaEventType } from 'types/analytics/ga/event.type';

import { savedPropertyTracker } from '../tracker';

describe('savedPropertyTracker', () => {
  beforeEach(() => {
    (global as unknown as { dataLayer: AnalyticsGaEventType[] }).dataLayer = [];
  });

  describe('onOpenUserAuthModal', () => {
    it('should send ga event', () => {
      savedPropertyTracker.onOpenUserAuthModal();

      expect((global as unknown as { dataLayer: AnalyticsGaEventType[] }).dataLayer).toEqual([
        {
          event: 'User Interaction',
          eventAction: 'Impression:Login to see saved properties',
        },
      ]);
    });
  });
});
