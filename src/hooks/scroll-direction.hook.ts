import { useEffect, useState } from 'react';

import { HooksScrollDirectionEnum } from 'hooks/scroll-direction/enum';
import { HooksScrollDirectionPropsInterface } from 'hooks/scroll-direction/props.interface';
import { WindowService } from 'services/window/service';

/**
 * Returns users current scroll direction.
 * @param initialDirection initial scroll direction value. Default is down
 * @param thresholdPixels Checks direction change after this threshold has been exceeded.
 * @returns scrollDirection
 */
export const useScrollDirection = ({
  initialDirection = HooksScrollDirectionEnum.DOWN,
  thresholdPixels = 0,
}: HooksScrollDirectionPropsInterface): string => {
  const [scrollDirection, setScrollDirection] = useState<HooksScrollDirectionEnum>(initialDirection);

  // Scroll Listeners
  useEffect(
    () => {
      let lastScrollY = window.scrollY;
      let ticking = false;

      const updateScrollDirection = (): void => {
        const scrollY = window.scrollY;

        if (Math.abs(scrollY - lastScrollY) < thresholdPixels) {
          // We haven't exceeded the threshold
          ticking = false;
          return;
        }

        setScrollDirection(scrollY > lastScrollY ? HooksScrollDirectionEnum.DOWN : HooksScrollDirectionEnum.UP);
        lastScrollY = scrollY > 0 ? scrollY : 0;
        ticking = false;
      };

      const onScroll = (): void => {
        if (!ticking) {
          WindowService.requestAnimationFrame(updateScrollDirection);
          ticking = true;
        }
      };

      WindowService.addEventListener('scroll', onScroll);
      return (): void => {
        WindowService.removeEventListener('scroll', onScroll);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return scrollDirection;
};
