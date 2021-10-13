import { HooksScrollDirectionEnum } from 'hooks/scroll-direction/enum';

export interface HooksScrollDirectionPropsInterface {
  /**
   * initial direction
   */
  initialDirection?: HooksScrollDirectionEnum;
  /**
   * Checks direction change after this threshold has been exceeded
   */
  thresholdPixels?: number;
}
