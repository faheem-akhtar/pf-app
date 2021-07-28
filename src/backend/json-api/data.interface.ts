export interface BackendJsonApiDataInterface {
  /**
   * Id
   */
  id: string;
  /**
   * Type
   */
  type: string;
  /**
   * Attributes
   */
  attributes: { [key: string]: Object | string | number | void | null }; // Could be any type of value
  /**
   * Relationships
   */
  relationships: { [key: string]: { data: BackendJsonApiDataInterface | BackendJsonApiDataInterface[] | null } };
  /**
   * links
   */
  links: { [key: string]: string };
  /**
   * meta
   */
  meta: { [key: string]: Object | string | number | void | null }; // Could be any type of value
}
