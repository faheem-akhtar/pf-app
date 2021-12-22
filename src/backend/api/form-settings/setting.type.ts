export type BackendApiFormSettingsSettingType = {
  /**
   * Id
   */
  id: string;
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
