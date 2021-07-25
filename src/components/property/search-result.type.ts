import { PropertySerpObfuscatedType } from './serp/obfuscated/type';

export type PropertySearchResultType = {
  /**
   * Array of property cards
   */
  properties: PropertySerpObfuscatedType[];
  /**
   * Total number of properties available for this search parameters
   */
  total: number;
  /**
   * Total number of pages available (backend may not allow to access page number above certain threshold)
   */
  pages: number;
};
