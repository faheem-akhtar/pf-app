import { GalleryScrollObjectFitEnum } from './object-fit.enum';
import { GalleryScrollTemplateItemInterface } from './template-item.interface';

export interface GalleryScrollPictureComponentPropsInterface extends GalleryScrollTemplateItemInterface {
  /**
   * Has gallery been touched by user
   */
  isTouched: boolean;

  /**
   * Image fit behavior
   */
  objectFit?: GalleryScrollObjectFitEnum;
}
