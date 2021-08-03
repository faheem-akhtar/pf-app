import { GalleryScrollBrowseEnum } from './browse.enum';
import { galleryScrollComputeItemPositionsXUpdate } from './compute-item-positions-x-update';
import { GalleryScrollItemInterface } from './item.interface';
import { GalleryScrollStateInterface } from './state.interface';

export const galleryScrollMakeInitialState = (
  items: GalleryScrollItemInterface[],
  isRtl: boolean
): GalleryScrollStateInterface => ({
  isDragging: false,
  activeIndex: 0,
  itemsPositionsX: items.reduce((acc, item, index) => {
    if (acc[index] !== undefined) {
      return acc;
    }
    return { ...acc, [index]: 100 };
  }, galleryScrollComputeItemPositionsXUpdate(items.length, isRtl, 0)),
  pointerPositionStart: null,
  pointerPositionCurrent: null,
  isTouched: false,
  browse: GalleryScrollBrowseEnum.none,
});
