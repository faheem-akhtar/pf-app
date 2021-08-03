import { JSXInternal } from 'preact/src/jsx';

import { GalleryScrollBrowseEnum } from './browse.enum';
import { galleryScrollGetSlidingImagesIndexes } from './get-sliding-images-indexes';
import { GalleryScrollStateInterface } from './state.interface';

/**
 * Generates sliding styles for item in gallery
 *
 * @param index - position of the item in gallery
 */
export function galleryScrollGetSlidingStyles(
  state: GalleryScrollStateInterface,
  index: number,
  numberOfImages: number
): JSXInternal.CSSProperties {
  const slidingIndexes = galleryScrollGetSlidingImagesIndexes(state.activeIndex, numberOfImages);
  const isSliding = slidingIndexes.includes(index);

  if (isSliding) {
    if (state.isDragging && state.pointerPositionCurrent !== null && state.pointerPositionStart !== null) {
      // Dragging & item sliding
      // Set position instantly with current drag value
      const pixels = state.pointerPositionCurrent - state.pointerPositionStart;
      const style = {
        transitionDuration: '0ms',
        transform: `translateX(calc(${state.itemsPositionsX[index]}% + ${pixels}px))`,
      };

      return style;
    }

    // This case is when user finished dragging or when he just clicked on gallery.
    const style = {
      transitionDuration: '300ms',
      transform: `translateX(${state.itemsPositionsX[index]}%)`,
    };

    // Not browsing or browsing toward next item or browsing toward previous item
    if (
      state.browse === GalleryScrollBrowseEnum.none ||
      (state.browse === GalleryScrollBrowseEnum.next && index === slidingIndexes[2]) ||
      (state.browse === GalleryScrollBrowseEnum.previous && index === slidingIndexes[0])
    ) {
      // Set position instantly
      style.transitionDuration = '0ms';
    }

    return style;
  }

  // Default behavior
  return {
    transform: `translateX(${state.itemsPositionsX[index]}%)`,
  };
}
