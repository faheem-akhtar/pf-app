import { SeoContentInterface } from './content/interface';
import { SeoLinksInterface } from './links/interface';

export interface SeoDataInterface extends SeoLinksInterface {
  content?: SeoContentInterface;
}
