export enum FiltersQueryParamEnum {
  /**
   * Category
   * @example rent
   */
  category = 'categorySlug',

  /**
   * City
   * @example abu-dhabi
   */
  city = 'citySlug',

  /**
   * Furnished
   * @example furnished
   */
  furnish = 'furnishSlug',

  /**
   * Bedroom
   * @example 1-bedroom, 2-bedroom, studio
   */
  bedroom = 'bedroomSlug',

  /**
   * Property Type
   * @example apartments
   */
  propertyType = 'propertyTypeSlug',

  /**
   * Sale type
   * @example for-sale, for-rent
   */
  saleType = 'saleType',

  /**
   * Price type
   * @example monthly
   */
  priceType = 'priceType',

  /**
   * Location
   * @example dubai-marina
   */
  location = 'locationSlug',
}
