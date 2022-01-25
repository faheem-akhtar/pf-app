import { PROPERTY_SERP_STICKY_HEADER_HEIGHT } from 'components/property/serp/sticky-header-height.constant';

export const propertyCardComputeVisibilityPercentage = (container: HTMLDivElement): number => {
  const cardRect = container.getBoundingClientRect();

  let heightPxOnTheScreen = cardRect.height;

  const cardAboveTheScreen = cardRect.height + cardRect.top < 0;
  const cardBelowTheScreen = cardRect.top >= window.innerHeight;
  if (cardAboveTheScreen || cardBelowTheScreen) {
    heightPxOnTheScreen = 0;
  } else if (cardRect.top < 0) {
    heightPxOnTheScreen = cardRect.height + cardRect.top - PROPERTY_SERP_STICKY_HEADER_HEIGHT;
  } else if (cardRect.bottom > window.innerHeight) {
    heightPxOnTheScreen = window.innerHeight - cardRect.top;
  }

  return (heightPxOnTheScreen / cardRect.height) * 100;
};
