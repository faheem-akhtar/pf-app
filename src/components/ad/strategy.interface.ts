import { AdTargetingInterface } from './targeting.interface';

export interface AdStrategyInterface {
  /**
   * Set ad targeting
   */
  setTargeting(targeting: AdTargetingInterface): void;

  /**
   * Refresh all ad units
   */
  refreshAllAds(): void;
}
