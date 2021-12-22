export type BackendApiFormSettingsSettingType = {
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
  /**
   * Fields
   */
  fields?: { id: string }[];
} & Record<string, string | BackendApiFormSettingsSettingType[]>;
