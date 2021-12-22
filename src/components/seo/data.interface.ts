import { SeoContentInterface } from './content/interface';
import { SeoLinksResultType } from './links/result.type';

export interface SeoDataInterface extends SeoLinksResultType {
  content?: SeoContentInterface;
}
