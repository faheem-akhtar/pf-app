export interface BreadcrumbInterface {
  /**
   * Name
   * @example Apartments
   */
  name: string;

  /**
   * Routing parameters
   * @example /en/search?t=1&c=1
   */
  link: string;

  /**
   * Total count for the link
   * @example 4881
   */
  count: number;
}
