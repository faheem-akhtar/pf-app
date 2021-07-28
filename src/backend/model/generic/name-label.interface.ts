import { BackendJsonApiModelType } from 'backend/json-api/model.type';

export interface BackendModelGenericNameLabelInterface extends BackendJsonApiModelType {
  /**
   * Property type ID
   */
  id: string;

  /**
   * Property type name
   */
  name: string;

  /**
   * Property type label
   */
  label: string;
}
