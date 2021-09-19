export enum FiltersQueryParametersEnum {
  /**
   * How to order the results
   */
  sort = 'ob',

  /**
   * Text of the query
   */
  query = 'q',

  /**
   * Services needed
   */
  categoryId = 'c',

  /**
   * Type
   */
  propertyTypeId = 't',

  /**
   * Location ids
   */
  locationsIds = 'l',

  /**
   * Min beds
   */
  minBedroom = 'bf',

  /**
   * Max beds
   */
  maxBedroom = 'bt',

  /**
   * Min bathrooms
   */
  minBathroom = 'btf',

  /**
   * Max bathrooms
   */
  maxBathroom = 'btt',

  /**
   * Min price
   */
  minPrice = 'pf',

  /**
   * Max price
   */
  maxPrice = 'pt',

  /**
   * Furnishing
   */
  furnishing = 'fu',

  /**
   * Area (Min)
   */
  minArea = 'af',

  /**
   * Area (Max)
   */
  maxArea = 'at',

  /**
   * Price period
   */
  pricePeriod = 'rp',

  /**
   * Keywords
   */
  keyword = 'kw',

  /**
   * Amenities
   */
  amenities = 'am[]',

  /**
   * Completion status
   */
  completionStatus = 'cs',

  /**
   * Payment method
   */
  paymentMethod = 'pm',

  /**
   * Price inclusive/exclusive
   */
  utilitiesPriceType = 'ut',

  /**
   * Virtual viewings
   */
  virtualViewings = 'vv',

  /**
   * Is developer property
   */
  isDeveloperProperty = 'dp',

  /**
   * Min installment years
   */
  minInstallmentYears = 'iyf',

  /**
   * Max installment years
   */
  maxInstallmentYears = 'iyt',

  /**
   * Pagination page to request
   */
  pageNumber = 'page',
}
