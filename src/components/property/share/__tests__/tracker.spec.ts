import { propertyShareTracker } from '../tracker';
import { PropertyShareTrackerPlatformType } from '../tracker-platform.type';

describe('propertyShareTracker', () => {
  beforeEach(() => {
    (global as unknown as Window).dataLayer = [];
  });

  describe('onClickSocialShare', () => {
    const sharingPlatform: PropertyShareTrackerPlatformType[] = ['Facebook', 'Whatsapp', 'Twitter', 'Email'];
    sharingPlatform.forEach((platform) => {
      it(`should send ga event for ${platform}`, () => {
        propertyShareTracker.onClickSocialShare(platform);

        expect((global as unknown as Window).dataLayer).toEqual([
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

      expect((global as unknown as Window).dataLayer).toEqual([
        {
          event: 'User Interaction',
          eventAction: 'Finish:Email Share',
          eventLabel: 'Social Sharing',
        },
      ]);
    });
  });
});
