import { AdTargetingInterface } from 'types/ad/targeting.interface';
import { AdUnitInterface } from 'types/ad/unit.interface';
import { BackendModelPropertyInterface } from 'backend/model/property/interface';

export type BackendApiPropertySearchJsonApiResultType = {
  /**
   * Community top spot properties
   */
  cts: BackendModelPropertyInterface[];
  /**
   * Smart ads properties
   */
  smart_ads: BackendModelPropertyInterface[];
  /**
   * Properties directly from developer
   */
  direct_from_developer: BackendModelPropertyInterface[];
  /**
   * Normal properties
   */
  properties: BackendModelPropertyInterface[];
  /**
   * Meta information
   */
  meta: {
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
  };
};
