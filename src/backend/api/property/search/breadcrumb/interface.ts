export interface BackendApiPropertySearchBreadcrumbInterface {
  /**
   * Type
   * @example breadcrumb_item
   */
  type: string;

  /**
   * Id
   * @example 61823ae44349a
   */
  id: string;

  /**
   * Attributes
   */
  attributes: {
    /**
     * Name
     * @example Apartments
     */
    name: string;
  };

  /**
   * Links
   */
  links: {
    /**
     * Routing parameters
     * @example /en/search?t=1&c=1
     */
    self: string;
  };

  /**
   * Meta
   */
  meta: {
    /**
     * Total count for the link
     * @example 4881
     */
    count: number;
  };
}
