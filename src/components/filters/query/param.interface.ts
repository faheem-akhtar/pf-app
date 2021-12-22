import { FiltersQueryParamEnum } from './param.enum';

export interface FiltersQueryParamInterface {
  /**
   * Category
   * @example 'rent'
   */
  [FiltersQueryParamEnum.category]?: string;

  /**
   * City
   * @example 'abu-dhabi'
   */
  [FiltersQueryParamEnum.city]?: string;

  /**
   * Furnished
   * @example 'furnished'
   */
  [FiltersQueryParamEnum.furnish]?: string;

  /**
   * Bedroom
   * @example '1-bedroom', '2-bedroom', 'studio'
   */
  [FiltersQueryParamEnum.bedroom]?: string;

  /**
   * Property Type
   * @example 'apartments', 'apartment'
   */
  [FiltersQueryParamEnum.propertyType]?: string;

  /**
   * Sale type
   * @example 'for-sale', 'for-rent'
   */
  [FiltersQueryParamEnum.saleType]?: string;

  /**
   * Price type
   * @example 'monthly'
   */
  [FiltersQueryParamEnum.priceType]?: string;

  /**
   * Location
   * @example 'dubai-marina'
   */
  [FiltersQueryParamEnum.location]?: string;
}
