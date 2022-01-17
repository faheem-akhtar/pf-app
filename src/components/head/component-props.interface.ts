import { ViewsPageMetaInterface } from 'views/page-meta.interface';

export interface HeadComponentPropsInterface extends Omit<ViewsPageMetaInterface, 'description'> {
  /**
   * Snowplow host
   */
  snowplowHost?: string;

  /**
   * Page meta description
   */
  description?: string;
}
