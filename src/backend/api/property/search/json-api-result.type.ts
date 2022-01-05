import { BackendModelPropertyInterface } from 'backend/model/property/interface';
import { AdTargetingInterface } from 'types/ad/targeting.interface';

export type BackendApiPropertySearchJsonApiResultType = {
  /**
   * Community top spot properties
   */
  cts?: BackendModelPropertyInterface[];
  /**
   * Smart ads properties
   */
  smart_ads?: BackendModelPropertyInterface[];
  /**
   * Properties directly from developer
   */
  direct_from_developer?: BackendModelPropertyInterface[];
  /**
   * Normal properties
   */
  properties: BackendModelPropertyInterface[];
  /**
   * Meta information
   */
  meta: {
    /**
     * Ad targeting
     */
    ad_targeting: AdTargetingInterface;

    /**
     * Ad placeholders
     */
    ad_placeholders?: boolean;

    /**
     * Page title
     */
    meta_title: string;

    /**
     * Page description
     */
    meta_description: string;

    /**
     * Schema.org structured data
     */
    json_schema: object[];
  };
};
