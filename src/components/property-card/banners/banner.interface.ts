import { PropertyCardBannersBannerClassEnum } from './banner-class.enum';

export interface PropertyCardBannersBannerInterface {
  /**
   * Text to display
   */
  text: string;
  /**
   * Color class to apply to banner
   */
  colorClass: PropertyCardBannersBannerClassEnum;
}
