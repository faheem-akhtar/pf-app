export interface BackendModelLocationAutocompleteInterface {
  /**
   * The unique Location ID
   * @example '73'
   */
  id: string;

  /**
   * The name of the location
   * @example 'Jumeirah Village Circle'
   */
  name: string;

  /**
   * Abbreviation
   * @example 'JVC'
   */
  abbreviation: string;

  /**
   * Full name from level 0
   * @example 'Abu Dhabi, Khalifa City'
   */
  path_name: string;

  /**
   * Full location ids from top most level to current
   * @example '1.50.280'
   */
  path: string;

  /**
   * Url slug for the location
   * @example 'jumeirah-village-circle'
   */
  current_language_slug: string;
}
