import { PROPERTY_SERP_STICKY_HEADER_HEIGHT } from 'components/property/serp/sticky-header-height.constant';

import { propertyCardComputeVisibilityPercentage } from '../compute-visibility-percentage';

describe('propertyCardComputeVisibilityPercentage', () => {
  it('should return 50% if half of the card is above the screen (account for sticky header height)', () => {
    const result = propertyCardComputeVisibilityPercentage({
      getBoundingClientRect: () => ({
        top: -100 + PROPERTY_SERP_STICKY_HEADER_HEIGHT,
        height: 200,
        bottom: 100,
      }),
    } as HTMLDivElement);

    expect(result).toEqual(50);
  });

  it('should return 50% if half of the card is below the screen', () => {
    Object.defineProperty(window, 'innerHeight', { value: 600 });
    const result = propertyCardComputeVisibilityPercentage({
      getBoundingClientRect: () => ({
        top: 500,
        height: 200,
        bottom: 700,
      }),
    } as HTMLDivElement);

    expect(result).toEqual(50);
  });

  it('should return 100% when completely on screen', () => {
    Object.defineProperty(window, 'innerHeight', { value: 600 });
    const result = propertyCardComputeVisibilityPercentage({
      getBoundingClientRect: () => ({
        top: 200,
        height: 200,
        bottom: 400,
      }),
    } as HTMLDivElement);

    expect(result).toEqual(100);
  });
});
