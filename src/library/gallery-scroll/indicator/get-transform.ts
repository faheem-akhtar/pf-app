/**
 * Calculates shift for scroll indicator items container
 */
export const galleryScrollIndicatorGetTransform = (props: {
  items: { isHidden: boolean }[];
  itemWidth: number;
  isRtl: boolean;
}): number => {
  let transformIndex = 0;

  props.items.some((item, index) => {
    if (!item.isHidden) {
      return true;
    }

    transformIndex = props.isRtl ? index + 1 : -(index + 1);

    return false;
  });

  return transformIndex * props.itemWidth;
};
