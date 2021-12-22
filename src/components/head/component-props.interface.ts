import { ViewsPageMetaInterface } from 'views/page-meta.interface';

export interface HeadComponentPropsInterface extends ViewsPageMetaInterface {
  /**
   * Snowplow host
   */
  snowplowHost: string;
}
