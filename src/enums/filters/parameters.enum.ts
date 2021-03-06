/**
 * This filters parameters are accepted by the pf-website search api
 */
export enum FiltersParametersEnum {
  /**
   * How to order the results
   */
  sort = 'sort',

  /**
   * Text of the query
   */
  query = 'query',

  /**
   * Services needed
   */
  categoryId = 'filter[category_id]',

  /**
   * Type
   */
  propertyTypeId = 'filter[property_type_id]',

  /**
   * Location ids
   */
  locationsIds = 'filter[locations_ids]',

  /**
   * Bedrooms
   */
  bedrooms = 'filter[number_of_bedrooms]',

  /**
   * Bathrooms
   */
  bathrooms = 'filter[number_of_bathrooms]',

  /**
   * Min price
   */
  minPrice = 'filter[min_price]',

  /**
   * Max price
   */
  maxPrice = 'filter[max_price]',

  /**
   * Furnishing
   */
  furnishing = 'filter[furnished]',

  /**
   * Area (Min)
   */
  minArea = 'filter[min_area]',

  /**
   * Area (Max)
   */
  maxArea = 'filter[max_area]',

  /**
   * Price period
   */
  pricePeriod = 'filter[price_type]',

  /**
   * Keywords
   */
  keyword = 'filter[keywords]',

  /**
   * Amenities
   */
  amenities = 'filter[amenities]',

  /**
   * Completion status
   */
  completionStatus = 'filter[completion_status]',

  /**
   * Use 1 to exclude descendants of searched locations 0 to include them
   */
  excludeLocationsDescendants = 'filter[exclude_locations_descendants]',

  /**
   * Use true to get all properties assigned direcly to this location
   */
  exactLocation = 'filter[exact_location]',

  /**
   * Polygon
   */
  boundingBox = 'filter[bounding_box]',

  /**
   * Geohash
   */
  geohashViewport = 'filter[geohash_viewport]',

  /**
   * Geohash level
   */
  hashBox = 'filter[hash_box]',

  /**
   * Payment method
   */
  paymentMethod = 'filter[payment_method]',

  /**
   * Price inclusive/exclusive
   */
  utilitiesPriceType = 'filter[utilities_price_type]',

  /**
   * Virtual viewings
   */
  virtualViewings = 'filter[virtual_viewings]',

  /**
   * Is developer property
   */
  isDeveloperProperty = 'filter[is_developer_property]',

  /**
   * Min installment years
   */
  minInstallmentYears = 'filter[min_installment_years]',

  /**
   * Max installment years
   */
  maxInstallmentYears = 'filter[max_installment_years]',

  /**
   * Page number
   */
  pageNumber = 'page[number]',
}
