import { abTestTracker } from '../tracker';

describe('abTestTracker', () => {
  beforeEach(() => {
    window.dataLayer = [];
  });
  describe('load', () => {
    it('should send ga event', () => {
      abTestTracker.load({
        test1: {
          variants: {
            variantA: true,
          },
        },
        test2: {
          variants: {
            original: true,
          },
        },
        test3: {
          variants: {
            variantA: false,
          },
        },
      });

      expect(window.dataLayer).toEqual([
        {
          event: 'customEvent',
          eventCategory: 'Experiments',
          eventAction: 'test1-variantA',
        },
        {
          event: 'customEvent',
          eventCategory: 'Experiments',
          eventAction: 'test2-original',
        },
      ]);
    });
  });
});
