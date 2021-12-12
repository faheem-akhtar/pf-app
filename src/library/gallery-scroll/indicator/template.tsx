import { PropertyCardTypeEnum } from 'components/property-card/type.enum';
import { domClassMerge } from 'helpers/dom/class-merge';

import { galleryScrollIndicatorClassicMakeItems } from './classic/make-items';
import { galleryScrollIndicatorClassicVisibleItemsCount } from './classic/visible-items-count';
import styles from './gallery-scroll-indicator.module.scss';
import { galleryScrollIndicatorGetTransform } from './get-transform';
import { GalleryScrollIndicatorItemInterface } from './item.interface';
import { galleryScrollIndicatorMakeItems } from './make-items';
import { GalleryScrollIndicatorPropsInterface } from './props.interface';
import { galleryScrollIndicatorVisibleItemsCount } from './visible-items-count';

export const GalleryScrollIndicatorTemplate = (props: GalleryScrollIndicatorPropsInterface): JSX.Element | null => {
  const { cardType = PropertyCardTypeEnum.modern } = props;

  if (props.itemsCount <= 1) return null;

  const items =
    props.cardType === PropertyCardTypeEnum.modern
      ? galleryScrollIndicatorMakeItems(props.itemsCount, props.activeIndex)
      : galleryScrollIndicatorClassicMakeItems(props.itemsCount, props.activeIndex);

  const getItemClassName = (item: GalleryScrollIndicatorItemInterface): string =>
    domClassMerge(styles.dot, {
      [styles[`dot--${cardType}`]]: !!cardType,
      [styles['dot--active']]: item.isActive,
      [styles['dot--hidden']]: item.isHidden,
      [styles['dot--small']]: props.cardType === PropertyCardTypeEnum.modern && item.isSmall,
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
    <div
      className={styles.container}
      style={{
        width:
          props.itemWidth *
          (props.cardType === PropertyCardTypeEnum.modern
            ? widthMultiplier
            : galleryScrollIndicatorClassicVisibleItemsCount),
      }}
    >
      <div className={styles.items} style={containerStyle}>
        {items.map((item, itemIndex) => (
          <div key={itemIndex} className={getItemClassName(item)} />
        ))}
      </div>
    </div>
  );
};
