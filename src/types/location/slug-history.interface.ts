export interface LocationSlugHistoryInterface {
  /**
   * The unique id for the record
   */
  id: string;

  /**
   * Old location slug
   * @example 'adliya'
   */
  originalSlug: string;

  /**
   * New location slug
   * @example 'manama-adliya'
   */
  newSlug: string;
}
