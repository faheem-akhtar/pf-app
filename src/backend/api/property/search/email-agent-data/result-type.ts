export type BackendApiPropertySearchEmailAgentDataResultType = {
  /**
   * Category Id
   * Example: 1 = Buy
   */
  categoryId: number;

  /**
   * Property location id
   */
  propertyLocationId: number;

  /**
   * Amenities
   * Example: "MR | AP"
   */
  amenities: string[];

  /**
   * Property type id
   * Example: 20 = Penthouse
   */
  propertyTypeId: number;
};
