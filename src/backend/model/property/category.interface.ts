import { JsonApiModel } from 'helpers/json-api/model';

export interface BackendModelPropertyCategoryInterface extends JsonApiModel {
  /**
   * BackendModelProperty category ID
   */
  id: string;

  /**
   * BackendModelProperty category full name
   */
  full_name: string;

  /**
   * BackendModelProperty category short name
   */
  short_name: string;
}
