import { GalleryScrollTemplateItemInterface } from './template-item.interface';

export interface GalleryScrollPictureComponentPropsInterface extends GalleryScrollTemplateItemInterface {
  /**
   * Has gallery been touched by user
   */
  isTouched: boolean;
}
