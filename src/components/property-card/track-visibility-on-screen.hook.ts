import { useEffect } from 'react';

import { StatsService } from 'services/stats/service';

import { propertyCardComputeVisibilityPercentage } from './compute-visibility-percentage';

const LISTING_REQUIRED_PERCENTAGE_VISIBLILITY_ON_SCREEN_TO_TRACK_IMPRESSION = 50;
const LISTING_REQUIRED_TIME_MS_ON_SCREEN_TO_TRACK_IMPRESSION = 500;
const LISTING_ON_THE_SCREEN_CHECK_INTERVAL_MS = LISTING_REQUIRED_TIME_MS_ON_SCREEN_TO_TRACK_IMPRESSION / 2;

export const usePropertyCardTrackVisibilityOnScreen = (
  statsDataPromise: Promise<{ ok: boolean }>,
  propertyId: string,
  containerRef: React.RefObject<HTMLDivElement>
): void => {
  useEffect(() => {
    let timeMsOnScreenWithRequiredPercentOfVisibility = 0;
    const intervalId = setInterval(() => {
      if (!containerRef.current) {
        return;
      }

      const visibilityPercentage = propertyCardComputeVisibilityPercentage(containerRef.current);
      if (visibilityPercentage > LISTING_REQUIRED_PERCENTAGE_VISIBLILITY_ON_SCREEN_TO_TRACK_IMPRESSION) {
        timeMsOnScreenWithRequiredPercentOfVisibility += LISTING_ON_THE_SCREEN_CHECK_INTERVAL_MS;
      }

      if (timeMsOnScreenWithRequiredPercentOfVisibility >= LISTING_REQUIRED_TIME_MS_ON_SCREEN_TO_TRACK_IMPRESSION) {
        statsDataPromise.then(({ ok }) => {
          if (ok) {
            StatsService().propertyImpression(parseInt(propertyId));
          } else {
            // eslint-disable-next-line no-console
            console.error('failed to send listing impression because stats data was not loaded');
          }
        });
        clearInterval(intervalId);
      }
    }, LISTING_ON_THE_SCREEN_CHECK_INTERVAL_MS);

    return (): void => {
      clearInterval(intervalId);
    };
  }, [statsDataPromise, containerRef, propertyId]);
};
