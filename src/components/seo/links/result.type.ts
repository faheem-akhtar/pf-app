import { SeoLinksAttributeInterface } from './attribute.interface';

export type SeoLinksResultType = {
  /**
   * Popular searches
   */
  popularSearches?: SeoLinksAttributeInterface;

  /**
   * Nearby areas
   */
  nearbyAreas?: SeoLinksAttributeInterface;

  /**
   * Alternate category
   */
  alternateCategory?: SeoLinksAttributeInterface;
};
