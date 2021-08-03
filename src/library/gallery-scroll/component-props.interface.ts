import { GalleryScrollItemInterface } from './item.interface';

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
   * On gallery mouse down or touch down
   */
  onTouch: () => void;
}
