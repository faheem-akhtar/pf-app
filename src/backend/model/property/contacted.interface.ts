import { BackendModelPropertyContactedTypeEnum } from './contacted-type.enum';
import { JsonApiModel } from 'helpers/json-api/model';

export interface BackendModelPropertyContactedInterface extends JsonApiModel {
  /**
   * BackendModelProperty id
   */
  property_id: number;

  /**
   * Contact date
   */
  contact_date: string;

  /**
   * Contact type
   */
  contact_type: BackendModelPropertyContactedTypeEnum;
}
