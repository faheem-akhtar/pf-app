import { GalleryScrollObjectFitEnum } from './object-fit.enum';
import { GalleryScrollTemplateItemInterface } from './template-item.interface';

export interface GalleryScrollTemplatePropsInterface {
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
   * Clicked the gallery
   */
  onClick?: React.MouseEventHandler<HTMLDivElement>;

  /**
   * Additional class name
   */
  className?: string;

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

  /**
   * Image fit behavior
   */
  objectFit?: GalleryScrollObjectFitEnum;

  /**
   * Right to left alignment (true for Arabic)
   */
  isRtl: boolean;
}
