import { SeoLinkInterface } from 'components/seo/link.interface';

export interface SeoLinksAttributeInterface {
  /**
   * Title of the category
   * @example Popular searches
   */
  title: string;

  /**
   * List of seo links
   */
  links: SeoLinkInterface[];
}
