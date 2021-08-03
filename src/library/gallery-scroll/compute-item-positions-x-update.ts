import { galleryScrollGetSlidingImagesIndexes } from './get-sliding-images-indexes';

export const galleryScrollComputeItemPositionsXUpdate = (
  itemsCount: number,
  isRtl: boolean,
  activeIndex: number
): Record<string, number> => {
  // Define the 3 sliding indexes
  const slidingIndex: number[] = galleryScrollGetSlidingImagesIndexes(activeIndex, itemsCount);

  // Update sliding items position X
  const itemsPositionsXUpdate: Record<string, number> = {};
  slidingIndex.forEach((itemIndex, i) => {
    itemsPositionsXUpdate[itemIndex] = (-100 + 100 * i) * (isRtl ? -1 : 1);
  });

  return itemsPositionsXUpdate;
};
