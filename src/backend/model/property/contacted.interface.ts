import { BackendJsonApiModelType } from 'backend/json-api/model.type';

import { BackendModelPropertyContactedTypeEnum } from './contacted-type.enum';

export interface BackendModelPropertyContactedInterface extends BackendJsonApiModelType {
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
