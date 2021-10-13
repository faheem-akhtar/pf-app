import { GalleryScrollPropsBaseInterface } from './props-base.interface';
import { GalleryScrollTemplateItemInterface } from './template-item.interface';

export interface GalleryScrollTemplatePropsInterface extends GalleryScrollPropsBaseInterface {
  /**
   * Ref to gallery
   */
  containerRef: React.Ref<HTMLDivElement>;

  /**
   * Touch started
   */
  onTouchStart: React.TouchEventHandler<HTMLDivElement>;

  /**
   * Pressing down mouse button
   */
  onMouseDown: React.MouseEventHandler<HTMLDivElement>;

  /**
   * Images
   */
  items: GalleryScrollTemplateItemInterface[];

  /**
   * Gallery has been touched by user
   */
  isTouched: boolean;

  /**
   * Active index
   */
  activeIndex: number;
}
