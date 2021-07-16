export interface ConfigPriceChoicesInterface {
  /**
   * Minimum price
   */
  min: number;
  /**
   * Maximum price
   */
  max: number;
  /**
   * Price increaments by index
   */
  increments: Record<string, number>;
}
