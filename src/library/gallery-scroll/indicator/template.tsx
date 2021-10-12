import { domClassMerge } from 'helpers/dom/class-merge';

import styles from './gallery-scroll-indicator.module.scss';
import { galleryScrollIndicatorGetTransform } from './get-transform';
import { GalleryScrollIndicatorItemInterface } from './item.interface';
import { galleryScrollIndicatorMakeItems } from './make-items';
import { GalleryScrollIndicatorPropsInterface } from './props.interface';
import { galleryScrollIndicatorVisibleItemsCount } from './visible-items-count';

export const GalleryScrollIndicatorTemplate = (props: GalleryScrollIndicatorPropsInterface): JSX.Element | null => {
  if (props.itemsCount <= 1) return null;

  const items = galleryScrollIndicatorMakeItems(props.itemsCount, props.activeIndex);

  const getItemClassName = (item: GalleryScrollIndicatorItemInterface): string =>
    domClassMerge(styles.dot, {
      [styles.dot__active]: item.isActive,
      [styles.dot__hidden]: item.isHidden,
      [styles.dot__small]: item.isSmall,
    });

  const transformXPx = galleryScrollIndicatorGetTransform({ items, itemWidth: props.itemWidth, isRtl: props.isRtl });
  const containerStyle = {
    transform: `translateX(${transformXPx}px)`,
  };

  const widthMultiplier =
    props.itemsCount < galleryScrollIndicatorVisibleItemsCount
      ? props.itemsCount
      : galleryScrollIndicatorVisibleItemsCount;

  return (
    <div className={styles.container} style={{ width: props.itemWidth * widthMultiplier }}>
      <div className={styles.items_container} style={containerStyle}>
        {items.map((item, itemIndex) => (
          <div key={itemIndex} className={getItemClassName(item)} />
        ))}
      </div>
    </div>
  );
};
