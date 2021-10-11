import { savedPropertyTracker } from '../tracker';

describe('savedPropertyTracker', () => {
  beforeEach(() => {
    window.dataLayer = [];
  });

  describe('onOpenUserAuthModal', () => {
    it('should send ga event', () => {
      savedPropertyTracker.onOpenUserAuthModal();

      expect(window.dataLayer).toEqual([
        {
          event: 'User Interaction',
          eventAction: 'Impression:Login to see saved properties',
        },
      ]);
    });
  });
});
