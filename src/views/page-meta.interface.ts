export interface ViewsPageMetaInterface {
  /**
   * Page meta title
   */
  title: string;

  /**
   * Page meta description
   */
  description: string;

  /**
   * if true, set meta tag to indicate that this page should be indexed by search engines
   * @default true
   */
  shouldIndex?: boolean;

  /**
   * Absolute page url to be used as canonical tag
   */
  pageUrl?: string;

  /**
   * Absolute page url to be used as alternate tag
   */
  alternateUrl?: string;

  /**
   * Next page url to be used in meta next tag
   */
  pageNextUrl?: string;

  /**
   * Previous page url to be used in meta previous tag
   */
  pagePreviousUrl?: string;

  /**
   * Schema.org structured data
   */
  schema?: string;
}
