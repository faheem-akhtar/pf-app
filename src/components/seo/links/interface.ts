import { SeoLinksLinkInterface } from './link.interface';

export interface SeoLinksInterface {
  /**
   * Popular searches
   */
  popularSearches?: SeoLinksLinkInterface;

  /**
   * Nearby areas
   */
  nearbyAreas?: SeoLinksLinkInterface;

  /**
   * Alternate category
   */
  alternateCategory?: SeoLinksLinkInterface;
}
