import { GalleryScrollDirectionEnum } from './direction.enum';
import { GalleryScrollSlidingStylesPropsInterface } from './sliding-styles-props.interface';

export interface GalleryScrollStateInterface extends GalleryScrollSlidingStylesPropsInterface {
  /**
   * Has user touched the gallery, if yes, we load all the images
   */
  isTouched: boolean;

  /**
   * Mouse/finger pointer position start
   */
  pointerPositionStartY: number | null;

  /**
   * Gallery scroll direction
   */
  scrollDirection: GalleryScrollDirectionEnum | null;
}
