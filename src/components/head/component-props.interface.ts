export interface HeadComponentPropsInterface {
  /**
   * Page title
   */
  pageTitle: string;

  /**
   * if true, set meta tag to indicate that this page should be indexed by search engines
   */
  shouldIndex?: boolean;
}
