import { BackendJsonApiModelType } from 'backend/json-api/model.type';

export interface BackendModelPropertyPriceTypeInterface extends BackendJsonApiModelType {
  /**
   * BackendModelProperty price type ID
   */
  id: string;

  /**
   * Human readable price ID
   */
  identifier: string;

  /**
   * BackendModelProperty price type label
   */
  label: string;

  /**
   * BackendModelProperty price type name
   */
  name: string;
}
