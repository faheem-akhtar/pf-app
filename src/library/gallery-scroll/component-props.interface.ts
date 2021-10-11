import { GalleryScrollItemInterface } from './item.interface';
import { GalleryScrollObjectFitEnum } from './object-fit.enum';

export interface GalleryScrollComponentPropsInterface {
  /**
   * Container element class name
   */
  className?: string;
  /**
   * Images
   */
  items: GalleryScrollItemInterface[];
  /**
   * Right to left alignment (true for Arabic)
   */
  isRtl: boolean;
  /**
   * Image fit behavior
   */
  objectFit?: GalleryScrollObjectFitEnum;
  /**
   * On gallery mouse down or touch down
   */
  onTouch: () => void;
  /**
   * Triggered when active item changes
   */
  onActiveIndexChange?: (index: number) => void;
}
