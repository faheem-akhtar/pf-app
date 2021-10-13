export interface TealiumPropertySearchStatsInterface {
  /**
   * Amenity codes
   */
  search_amenities: string[];

  /**
   * Category ids
   */
  search_category: string;

  /**
   * Completion status
   */
  search_completion: string;

  /**
   * Furnishing
   */
  search_furnishing: string;

  /**
   * Keywords
   */
  search_keywords: string;

  /**
   * Locations
   */
  search_locations: string[];

  /**
   * Area (Max)
   */
  search_max_area: string;

  /**
   * Area (Min)
   */
  search_min_area: string;

  /**
   * Bed (Max)
   */
  search_max_bed: string;

  /**
   * Bed (Min)
   */
  search_min_bed: string;
  /**
   * Price (Max)
   */
  search_max_price: string;

  /**
   * Price (Min)
   */
  search_min_price: string;

  /**
   * Property type
   */
  search_property_type: string;

  /**
   * Rental period
   */
  search_rental_period: string;

  /**
   * Virtual viewings
   */
  search_viewings_type: string;
}
