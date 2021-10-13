import { GalleryScrollItemInterface } from './item.interface';
import { GalleryScrollPropsBaseInterface } from './props-base.interface';

export interface GalleryScrollComponentPropsInterface extends GalleryScrollPropsBaseInterface {
  /**
   * Images
   */
  items: GalleryScrollItemInterface[];
  /**
   * On gallery mouse down or touch down
   */
  onTouch: () => void;
  /**
   * Triggered when active item changes
   */
  onActiveIndexChange?: (index: number, length: number) => void;
}
