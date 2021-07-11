import { JsonApiModel } from 'helpers/json-api/model';

export interface BackendModelPropertyPriceTypeInterface extends JsonApiModel {
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
