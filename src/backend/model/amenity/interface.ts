import { JsonApiModel } from 'helpers/json-api/model';

export interface BackendModelAmenityInterface extends JsonApiModel {
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
