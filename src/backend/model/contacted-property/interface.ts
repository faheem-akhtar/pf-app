import { BackendJsonApiModelType } from 'backend/json-api/model.type';
import { ContactedPropertyTypeEnum } from 'enums/contacted-property/type.enum';

export interface BackendModelContactedPropertyInterface extends BackendJsonApiModelType {
  contact_type: ContactedPropertyTypeEnum;
  property_id: number;
  contact_date: string;
}
