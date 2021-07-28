import { BackendJsonApiModelType } from 'backend/json-api/model.type';

export interface BackendModelPropertySavedInterface extends BackendJsonApiModelType {
  /**
   * BackendModelProperty id
   */
  property_id: number;

  /**
   * Save date
   */
  save_date: string;
}
