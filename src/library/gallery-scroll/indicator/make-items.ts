import { arrayFromRange } from 'helpers/array/from-range';
import { GalleryScrollIndicatorItemInterface } from './item.interface';
import { galleryScrollIndicatorVisibleItemsCount } from './visible-items-count';

export const galleryScrollIndicatorMakeItems = (
  itemsCount: number,
  activeIndex: number
): GalleryScrollIndicatorItemInterface[] =>
  arrayFromRange(0, itemsCount).map((i) => {
    const isActive = i === activeIndex;
    let isVisible;
    const firstActive = activeIndex === 0;
    const lastActive = activeIndex === itemsCount - 1;
    const numberOfSmallDots = galleryScrollIndicatorVisibleItemsCount - 1;
    if (firstActive) {
      isVisible = i <= numberOfSmallDots;
    } else if (lastActive) {
      isVisible = i >= activeIndex - numberOfSmallDots;
    } else {
      isVisible = Math.abs(i - activeIndex) <= numberOfSmallDots / 2;
    }

    const isHidden = !isVisible;

    return {
      isActive,
      isHidden,
      isSmall: !isHidden && !isActive,
    };
  });
