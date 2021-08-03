/**
 * Calculates shift for scroll indicator items container
 */
export const galleryScrollIndicatorGetTransform = (props: {
  items: { isHidden: boolean }[];
  itemWidth: number;
}): number => {
  let transformIndex = 0;

  props.items.some((item, index) => {
    const itemIsAtTheEnd = index === props.items.length - 2;

    // Do not shift
    if (!item.isHidden || itemIsAtTheEnd) {
      return true;
    }

    transformIndex = -(index + 1);

    return false;
  });

  return transformIndex * props.itemWidth;
};
