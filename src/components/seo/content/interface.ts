export interface SeoContentInterface {
  /**
   * Landing page uri
   * @example /en/buy/properties-for-sale.html
   */
  uri?: string;

  /**
   * Page meta title
   */
  title?: string;

  /**
   * Page meta description
   */
  description?: string;

  /**
   * Meta canonical url
   */
  canonical?: string;

  /**
   * Top heading
   */
  primaryHeading?: string;

  /**
   * Bottom heading
   */
  secondaryHeading?: string;

  /**
   * Top html content
   */
  primaryContent?: string;

  /**
   * Bottom html content
   */
  secondaryContent?: string;

  /**
   * Top image
   */
  primaryImageUrl?: string;

  /**
   * Bottom image
   */
  secondaryImageUrl?: string;

  /**
   * Top image alt
   */
  primaryImageAlt?: string;

  /**
   * Bottom image alt
   */
  secondaryImageAlt?: string;

  /**
   * Created at
   */
  createdAt: string;
}
