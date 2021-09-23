import { AdConfigInterface } from 'types/ad/config.interface';

import { PropertySerpObfuscatedType } from './obfuscated/type';

export type PropertySerpSearchResultType = {
  /**
   * Array of property cards
   */
  properties: PropertySerpObfuscatedType[];
  /**
   * Ads config for current search
   */
  adConfig: AdConfigInterface;
  /**
   * Total number of properties available for this search parameters
   */
  total: number;
  /**
   * Total number of pages available (backend may not allow to access page number above certain threshold)
   */
  pages: number;

  /**
   * Page title
   */
  title: string;
};
