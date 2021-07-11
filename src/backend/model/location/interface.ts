export interface BackendModelLocationInterface {
  /**
   * Additional links
   */
  links: {
    /**
     * Profile URL
     */
    building_reviews?: string;

    /**
     * Location image
     */
    image_location?: string;
  };

  // tslint:disable:variable-name

  /**
   * Location ID
   */
  id: string;

  /**
   * Location name
   */
  name: string;

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
   * Location number of children
   */
  children_count: number;

  /**
   * Level within the location tree, starts at 0
   */
  level: number;

  /**
   * Location type, ex: SUBCOMMUNITY
   */
  location_type: string;

  /**
   * Location review score
   */
  review_score: string;
}
