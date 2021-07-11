import { JsonApiModel } from 'helpers/json-api/model';

export interface BackendModelPropertySavedInterface extends JsonApiModel {
  /**
   * BackendModelProperty id
   */
  property_id: number;

  /**
   * Save date
   */
  save_date: string;
}
