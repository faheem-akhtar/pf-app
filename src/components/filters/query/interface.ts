import { FiltersQueryParametersEnum } from 'enums/filters/query-parameters.enum';

/**
 * Search form settings parameters to supply to the form settings API
 */
export interface FiltersQueryInterface {
  /**
   * Category ID
   */
  [FiltersQueryParametersEnum.categoryId]?: string;

  /**
   * Query
   */
  [FiltersQueryParametersEnum.query]?: string;

  /**
   * Location IDs
   */
  [FiltersQueryParametersEnum.locationsIds]?: string;

  /**
   * Sort
   */
  [FiltersQueryParametersEnum.sort]?: string;

  /**
   * Property Type
   */
  [FiltersQueryParametersEnum.propertyTypeId]?: string;

  /**
   * Price (Min)
   */
  [FiltersQueryParametersEnum.minPrice]?: string;

  /**
   * Price (Max)
   */
  [FiltersQueryParametersEnum.maxPrice]?: string;

  /**
   * Beds (Min)
   */
  [FiltersQueryParametersEnum.minBedroom]?: string;

  /**
   * Beds (Max)
   */
  [FiltersQueryParametersEnum.maxBedroom]?: string;

  /**
   * Bathrooms (Min)
   */
  [FiltersQueryParametersEnum.minBathroom]?: string;

  /**
   * Bathrooms (Max)
   */
  [FiltersQueryParametersEnum.maxBathroom]?: string;

  /**
   * Furnishing
   */
  [FiltersQueryParametersEnum.furnishing]?: string;

  /**
   * Area (Min)
   */
  [FiltersQueryParametersEnum.minArea]?: string;

  /**
   * Area (Max)
   */
  [FiltersQueryParametersEnum.maxArea]?: string;

  /**
   * Price period
   */
  [FiltersQueryParametersEnum.pricePeriod]?: string;

  /**
   * Keyword
   */
  [FiltersQueryParametersEnum.keyword]?: string;

  /**
   * Amenities
   */
  [FiltersQueryParametersEnum.amenities]?: string[];

  /**
   * Completion status
   */
  [FiltersQueryParametersEnum.completionStatus]?: string;

  /**
   * Payment method
   */
  [FiltersQueryParametersEnum.paymentMethod]?: string;

  /**
   * Price inclusive/exclusive
   */
  [FiltersQueryParametersEnum.utilitiesPriceType]?: string;

  /**
   * Virtual viewings
   */
  [FiltersQueryParametersEnum.virtualViewings]?: string;

  /**
   * Pagination page to request
   */
  [FiltersQueryParametersEnum.pageNumber]?: string;
}
