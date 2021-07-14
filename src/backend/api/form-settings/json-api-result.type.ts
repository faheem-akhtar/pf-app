/**
 * The result of the JsonApi sync for this endpoint
 */
export type BackendApiFormSettingJsonApiResultType = Array<{
  /**
   * Relationships
   */
  jsonApiRelationships: string[];
  /**
   * Type
   */
  jsonApiType: string;
  /**
   * Value
   */
  value: string;
  /**
   * Name
   */
  name: string;
}>;
