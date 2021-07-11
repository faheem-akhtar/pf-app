import { JsonApiDataInterface } from './data.interface';

export interface JsonApiPayloadInterface {
  /**
   * Data
   */
  data: JsonApiDataInterface | JsonApiDataInterface[];
  /**
   * Included fields
   */
  included?: JsonApiDataInterface[];
  /**
   * Meta
   */
  meta?: object;
}
