export interface LocationCompactInterface {
  /**
   * Location ID
   */
  id: string;

  /**
   * Location name
   */
  name: string;

  /**
   * Slug
   * @example dubai-marina
   */
  slug?: string;

  /**
   * Abbreviation
   */
  abbreviation: string;

  /**
   * Location path name, ex: Abu Dhabi, Khalifa City
   */
  path_name: string;

  /**
   * Location path, ex: 1.50.280
   */
  path: string;

  /**
   * Location type
   * Ex: SUBCOMMUNITY | CITY
   */
  location_type?: string;
}
