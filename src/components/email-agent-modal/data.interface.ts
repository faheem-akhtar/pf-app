export interface EmailAgentModalDataInterface {
  /**
   * Category Id
   * @example 1 = Buy
   */
  categoryId: number;

  /**
   * Property location id
   */
  propertyLocationId: number;

  /**
   * Amenities
   * @example "MR | AP"
   */
  amenities: string[];

  /**
   * Property type id
   * @example 20 = Penthouse
   */
  propertyTypeId: number;
}
