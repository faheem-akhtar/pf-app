import { ContactedPropertyTypeEnum } from 'enums/contacted-property/type.enum';

export interface ApiContactedPropertiesCreateRequestInterface {
  property_id: number;
  contact_date: string;
  contact_type: ContactedPropertyTypeEnum;
}
