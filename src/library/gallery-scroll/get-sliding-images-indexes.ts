export const galleryScrollGetSlidingImagesIndexes = (activeIndex: number, itemsCount: number): number[] => {
  return [(activeIndex - 1 + itemsCount) % itemsCount, activeIndex, (activeIndex + 1) % itemsCount];
};
