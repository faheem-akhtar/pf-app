import { AdTargetingInterface } from './targeting.interface';

export interface AdConfigInterface {
  /**
   * Ad targeting
   */
  ad_targeting: AdTargetingInterface;

  /**
   * Ad placeholders
   */
  ad_placeholders?: boolean;
}
