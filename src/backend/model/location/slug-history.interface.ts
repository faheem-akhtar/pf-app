import { BackendJsonApiModelType } from 'backend/json-api/model.type';

export interface BackendModelLocationSlugHistoryInterface extends BackendJsonApiModelType {
  /**
   * Old location slug
   * @example 'adliya'
   */
  original_slug: string;

  /**
   * New location slug
   * @example 'manama-adliya'
   */
  new_slug: string;

  /**
   * The location level
   * @example For Dubai level is 0
   */
  level: number;

  /**
   * Is this a primary language. This depends on the country
   * @example For ae true means 'en' where as for eg it means 'ar'
   */
  is_primary_language: boolean;
}
