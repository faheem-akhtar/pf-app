import { GalleryScrollObjectFitEnum } from './object-fit.enum';

export interface GalleryScrollPropsBaseInterface {
  /**
   * Clicked the gallery
   */
  onClick?: () => void;

  /**
   * Image fit behavior
   */
  objectFit?: GalleryScrollObjectFitEnum;

  /**
   * Additional class name
   */
  className?: string;

  /**
   * Right to left alignment (true for Arabic)
   */
  isRtl: boolean;
}
