import { ConfigPriceChoicesInterface } from './interface';

/**
 * Price configs by categoryId and price type
 */
export type ConfigPriceChoicesDefinitionInterface = {
  /**
   * Price config for buy categories
   */
  sell: ConfigPriceChoicesInterface;
  /**
   * Price configs for rent categories by period
   */
  rent: {
    /**
     * By year
     */
    y?: ConfigPriceChoicesInterface;
    /**
     * By month
     */
    m?: ConfigPriceChoicesInterface;
    /**
     * By week
     */
    w?: ConfigPriceChoicesInterface;
    /**
     * By day
     */
    d?: ConfigPriceChoicesInterface;
  };
};
