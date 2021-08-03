import { domClassMerge } from 'helpers/dom/class-merge';

import { GalleryScrollIndicatorTemplate } from './indicator/template';
import { GalleryScrollTemplatePropsInterface } from './template-props.interface';

import styles from './gallery-scroll.module.scss';

export const GalleryScrollTemplate: React.FunctionComponent<GalleryScrollTemplatePropsInterface> = (props) => {
  return (
    <div className={domClassMerge(props.className, styles.wrapper)} ref={props.containerRef}>
      <div
        className={styles.container}
        onTouchStart={props.onTouchStart}
        onMouseDown={props.onMouseDown}
        onClick={props.onClick}
      >
        {(props.isTouched ? props.items : props.items.slice(0, 1)).map((item, i) => (
          <picture style={item.style || ''} className={domClassMerge(styles.item)} key={i}>
            {item.sourceUrl && <source srcSet={item.sourceUrl.replace('.jpg', '.webp')} type='image/webp' />}
            {item.sourceUrl && <source srcSet={item.sourceUrl} type='image/jpeg' />}
            {item.sourceUrl && <img loading={props.isTouched ? undefined : 'lazy'} src={item.sourceUrl} />}
          </picture>
        ))}
      </div>

      <GalleryScrollIndicatorTemplate itemWidth={10} itemsCount={props.items.length} activeIndex={props.activeIndex} />
    </div>
  );
};
