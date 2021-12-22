import { BackendJsonApiModelType } from 'backend/json-api/model.type';
import { SeoLinksAttributeInterface } from 'components/seo/links/attribute.interface';

export interface BackendModelSeoLinksInterface extends BackendJsonApiModelType {
  /**
   * Popular searches
   */
  popular_searches?: SeoLinksAttributeInterface;

  /**
   * Nearby Areas
   */
  nearby_areas?: SeoLinksAttributeInterface;

  /**
   * Alternate Category
   */
  alternate_category?: SeoLinksAttributeInterface;
}
