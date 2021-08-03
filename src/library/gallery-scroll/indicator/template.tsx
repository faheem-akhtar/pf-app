import { domClassMerge } from 'helpers/dom/class-merge';

import { galleryScrollIndicatorGetTransform } from './get-transform';
import { galleryScrollIndicatorMakeItems } from './make-items';
import { galleryScrollIndicatorVisibleItemsCount } from './visible-items-count';

import { GalleryScrollIndicatorItemInterface } from './item.interface';
import { GalleryScrollIndicatorPropsInterface } from './props.interface';

import styles from './gallery-scroll-indicator.module.scss';

export const GalleryScrollIndicatorTemplate = (props: GalleryScrollIndicatorPropsInterface): JSX.Element | null => {
  if (props.itemsCount <= 1) return null;

  const items = galleryScrollIndicatorMakeItems(props.itemsCount, props.activeIndex);

  const getItemClassName = (item: GalleryScrollIndicatorItemInterface): string =>
    domClassMerge(styles.dot, {
      [styles.dot__active]: item.isActive,
      [styles.dot__hidden]: item.isHidden,
    });

  const transformXPx = galleryScrollIndicatorGetTransform({ items, itemWidth: props.itemWidth });
  const containerStyle = {
    transform: `translateX(${transformXPx}px)`,
  };

  return (
    <div className={styles.container} style={{ width: props.itemWidth * galleryScrollIndicatorVisibleItemsCount }}>
      <div className={styles.items_container} style={containerStyle}>
        {items.map((item, itemIndex) => (
          <div key={itemIndex} className={getItemClassName(item)} />
        ))}
      </div>
    </div>
  );
};
