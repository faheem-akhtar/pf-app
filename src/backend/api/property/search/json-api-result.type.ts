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
};
