import { domClassMerge } from 'helpers/dom/class-merge';

import styles from './gallery-scroll.module.scss';
import { GalleryScrollIndicatorTemplate } from './indicator/template';
import { GalleryScrollPictureComponent } from './picture-component';
import { GalleryScrollTemplatePropsInterface } from './template-props.interface';

export const GalleryScrollTemplate: React.FunctionComponent<GalleryScrollTemplatePropsInterface> = (props) => {
  return (
    <div className={domClassMerge(props.className, styles.wrapper)} ref={props.containerRef}>
      <div
        className={styles.container}
        onTouchStart={props.onTouchStart}
        onMouseDown={props.onMouseDown}
        onClick={props.onClick}
        data-testid='gallery-scroll'
      >
        {(props.isTouched ? props.items : props.items.slice(0, 1)).map((item, i) => (
          <GalleryScrollPictureComponent {...item} isTouched={props.isTouched} objectFit={props.objectFit} key={i} />
        ))}
      </div>

      <GalleryScrollIndicatorTemplate itemWidth={10} itemsCount={props.items.length} activeIndex={props.activeIndex} />
    </div>
  );
};
