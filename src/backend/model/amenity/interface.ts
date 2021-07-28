import { BackendJsonApiModelType } from 'backend/json-api/model.type';

export interface BackendModelAmenityInterface extends BackendJsonApiModelType {
  /**
   * Amenity ID
   * @example 'MR'
   */
  id: string;

  /**
   * Amenity name
   * @example 'Maids Room'
   */
  name: string;

  /**
   * Amenity label
   */
  label: string;

  // tslint:disable:variable-name
  /**
   * Amenity short value
   * @example 'MR'
   */
  short_value: string;
}
