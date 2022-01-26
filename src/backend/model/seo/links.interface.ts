import { BackendJsonApiModelType } from 'backend/json-api/model.type';
import { SeoLinksLinkInterface } from 'components/seo/links/link.interface';

export interface BackendModelSeoLinksInterface extends BackendJsonApiModelType {
  /**
   * Popular searches
   */
  popular_searches?: SeoLinksLinkInterface;

  /**
   * Nearby Areas
   */
  nearby_areas?: SeoLinksLinkInterface;

  /**
   * Alternate Category
   */
  alternate_category?: SeoLinksLinkInterface;
}
