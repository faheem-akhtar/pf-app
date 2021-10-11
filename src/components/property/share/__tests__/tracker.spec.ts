import { propertyShareTracker } from '../tracker';
import { PropertyShareTrackerPlatformType } from '../tracker-platform.type';

describe('propertyShareTracker', () => {
  beforeEach(() => {
    window.dataLayer = [];
  });

  describe('onClickSocialShare', () => {
    const sharingPlatform: PropertyShareTrackerPlatformType[] = ['Facebook', 'Whatsapp', 'Twitter', 'Email'];
    sharingPlatform.forEach((platform) => {
      it(`should send ga event for ${platform}`, () => {
        propertyShareTracker.onClickSocialShare(platform);

        expect(window.dataLayer).toEqual([
          {
            event: 'User Interaction',
            eventAction: `Click:${platform} Share`,
            eventLabel: 'Social Sharing',
          },
        ]);
      });
    });
  });

  describe('onSuccessSocialShare', () => {
    it('should send ga event', () => {
      propertyShareTracker.onSuccessSocialShare('Email');

      expect(window.dataLayer).toEqual([
        {
          event: 'User Interaction',
          eventAction: 'Finish:Email Share',
          eventLabel: 'Social Sharing',
        },
      ]);
    });
  });
});
