import { GalleryScrollSlidingStylesPropsInterface } from './sliding-styles-props.interface';

export interface GalleryScrollStateInterface extends GalleryScrollSlidingStylesPropsInterface {
  /**
   * Has user touched the gallery, if yes, we load all the images
   */
  isTouched: boolean;
}
