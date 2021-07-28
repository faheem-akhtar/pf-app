import { BackendJsonApiDataInterface } from './data.interface';

export interface BackendJsonApiPayloadInterface {
  /**
   * Data
   */
  data: BackendJsonApiDataInterface | BackendJsonApiDataInterface[];
  /**
   * Included fields
   */
  included?: BackendJsonApiDataInterface[];
  /**
   * Meta
   */
  meta?: object;
}
