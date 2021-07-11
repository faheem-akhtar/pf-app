import { JsonApiModel } from 'helpers/json-api/model';

export interface GenericNameLabelInterface extends JsonApiModel {
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
