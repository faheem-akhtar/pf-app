import { AdTargetingInterface } from './targeting.interface';
import { AdUnitInterface } from './unit.interface';

export interface AdConfigInterface {
  /**
   * Ad units
   */
  ad_units: AdUnitInterface[];

  /**
   * Ad targeting
   */
  ad_targeting: AdTargetingInterface;

  /**
   * Ad placeholders
   */
  ad_placeholders?: boolean;
}
