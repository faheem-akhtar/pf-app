import { BackendJsonApiModelType } from 'backend/json-api/model.type';

export interface BackendModelPropertyCategoryInterface extends BackendJsonApiModelType {
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
