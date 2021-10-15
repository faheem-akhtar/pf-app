import { propertyStub } from 'stubs/property/stub';

import { propertySerpObfuscatedFieldLiveEventValue } from 'components/property/serp/obfuscated/field/live-event-value';
import { propertySerpObfuscatedFieldVideoTour } from 'components/property/serp/obfuscated/field/video-tour';
import { PageTypeEnum } from 'enums/page-type/enum';
import { StatsService } from 'services/stats/service';

import { PropertyTracker } from '../tracker';

jest.mock('services/stats/service');
jest.mock('services/stats/attribution.service', () => {
  return {
    StatsAttributionService: jest.fn().mockImplementation(() => {
      return {
        push: jest.fn().mockImplementation(() => 'mock-attribution-id'),
      };
    }),
  };
});

let getPropertyStoreMock = jest.fn().mockImplementation(() => Promise.resolve({ listingStatusDisplayed: 'premium' }));

jest.mock('@propertyfinder/pf-frontend-common/dist/service/stats-data/service', () => {
  return {
    StatsDataService: jest.fn().mockImplementation(() => {
      return {
        getPropertyStore: jest.fn().mockImplementation(() => {
          return {
            load: getPropertyStoreMock,
          };
        }),
      };
    }),
  };
});

describe('PropertyTracker', () => {
  let propertyTracker: PropertyTracker;

  beforeEach(() => {
    (StatsService().propertyLoad as jest.Mock).mockReset();
    (StatsService().propertyImpression as jest.Mock).mockReset();

    window.dataLayer = [];

    propertyTracker = new PropertyTracker('My Page' as PageTypeEnum);
  });

  describe('load', () => {
    it('should send property load stats', () => {
      propertyTracker.load(propertyStub(), {});

      expect(StatsService().propertyLoad).toHaveBeenCalledTimes(1);
      expect(StatsService().propertyLoad).toHaveBeenCalledWith(198023, {});
    });
  });

  describe('impression', () => {
    it('should send property impression stats', () => {
      propertyTracker.impression(propertyStub(), {});

      expect(StatsService().propertyImpression).toHaveBeenCalledTimes(1);
      expect(StatsService().propertyImpression).toHaveBeenCalledWith(198023, {});
    });

    it('should send Live Viewing to GA', async () => {
      getPropertyStoreMock = jest.fn().mockImplementation(() => Promise.resolve({ listingStatusDisplayed: 'premium' }));
      await propertyTracker.impression(propertyStub({ [propertySerpObfuscatedFieldLiveEventValue]: true }), {});

      expect(getPropertyStoreMock).toHaveBeenCalledTimes(2);
      expect(getPropertyStoreMock).toHaveBeenCalledWith(198023);

      expect(window.dataLayer).toEqual([
        {
          event: 'customEvent',
          eventCategory: 'Live Viewing',
          eventAction: 'Live Viewing - Impression - Premium',
          eventLabel: 'My Page - Live Viewing - Impression - Premium',
        },
      ]);
    });

    it('should send Virtual Tour to GA', async () => {
      getPropertyStoreMock = jest.fn().mockImplementation(() => Promise.resolve({ listingStatusDisplayed: 'premium' }));
      await propertyTracker.impression(propertyStub({ [propertySerpObfuscatedFieldVideoTour]: {} }), {});

      expect(getPropertyStoreMock).toHaveBeenCalledTimes(2);
      expect(getPropertyStoreMock).toHaveBeenCalledWith(198023);

      expect(window.dataLayer).toEqual([
        {
          event: 'customEvent',
          eventCategory: 'Virtual Tour',
          eventAction: 'Virtual Tour - Impression - Premium',
          eventLabel: 'My Page - Virtual Tour - Impression - Premium',
        },
      ]);
    });
  });

  describe('click', () => {
    it('should send property click stats', () => {
      propertyTracker.click(propertyStub());

      expect(StatsService().propertyClick).toHaveBeenCalledTimes(1);
      expect(StatsService().propertyClick).toHaveBeenCalledWith(198023, {
        authentication: {
          attributionId: 'mock-attribution-id',
        },
      });
    });

    it('should send Live Viewing to GA', async () => {
      getPropertyStoreMock = jest.fn().mockImplementation(() => Promise.resolve({ listingStatusDisplayed: 'premium' }));
      await propertyTracker.click(propertyStub({ [propertySerpObfuscatedFieldLiveEventValue]: true }));

      expect(getPropertyStoreMock).toHaveBeenCalledTimes(2);
      expect(getPropertyStoreMock).toHaveBeenCalledWith(198023);

      expect(window.dataLayer).toEqual([
        {
          event: 'customEvent',
          eventCategory: 'Live Viewing',
          eventAction: 'Live Viewing - Click - Premium',
          eventLabel: 'My Page - Live Viewing - Click - Premium',
        },
      ]);
    });

    it('should send Virtual Tour to GA', async () => {
      getPropertyStoreMock = jest.fn().mockImplementation(() => Promise.resolve({ listingStatusDisplayed: 'premium' }));
      await propertyTracker.click(propertyStub({ [propertySerpObfuscatedFieldVideoTour]: {} }));

      expect(getPropertyStoreMock).toHaveBeenCalledTimes(2);
      expect(getPropertyStoreMock).toHaveBeenCalledWith(198023);

      expect(window.dataLayer).toEqual([
        {
          event: 'customEvent',
          eventCategory: 'Virtual Tour',
          eventAction: 'Virtual Tour - Click - Premium',
          eventLabel: 'My Page - Virtual Tour - Click - Premium',
        },
      ]);
    });
  });
});
