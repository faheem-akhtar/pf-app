import { PropertySerpInterface } from 'components/property/serp.interface';

export type PropertySearchResultType = {
  /**
   * Array of property cards
   */
  properties: PropertySerpInterface[];
  /**
   * Total number of properties available for this search parameters
   */
  total: number;
  /**
   * Total number of pages available (backend may not allow to access page number above certain threshold)
   */
  pages: number;
};
