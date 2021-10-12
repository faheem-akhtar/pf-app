import { arrayFromRange } from 'helpers/array/from-range';

import { GalleryScrollIndicatorItemInterface } from './item.interface';
import { galleryScrollIndicatorVisibleItemsCount } from './visible-items-count';

export const galleryScrollIndicatorMakeItems = (
  itemsCount: number,
  activeIndex: number
): GalleryScrollIndicatorItemInterface[] => {
  const numberOfSmallDots = galleryScrollIndicatorVisibleItemsCount - 1;
  const startMiddlePoint = Math.ceil(numberOfSmallDots / 2);
  const endMiddlePoint = itemsCount - Math.ceil(galleryScrollIndicatorVisibleItemsCount / 2) - 1;

  return arrayFromRange(0, itemsCount).map((i) => {
    const isActive = i === activeIndex;
    let isVisible = false;

    if (isActive) {
      isVisible = true;
    } else if (activeIndex <= startMiddlePoint) {
      if (i < activeIndex || i <= numberOfSmallDots) {
        isVisible = true;
      }
    } else if (activeIndex >= endMiddlePoint) {
      if (i > activeIndex || i >= itemsCount - numberOfSmallDots - 1) {
        isVisible = true;
      }
    } else if (Math.abs(activeIndex - i) <= startMiddlePoint) {
      isVisible = true;
    }
    const isHidden = !isVisible;

    return {
      isActive,
      isHidden,
      isSmall: !isActive && Math.abs(activeIndex - i) !== 1,
    };
  });
};
