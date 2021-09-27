import { ContactedPropertyTypeEnum } from 'enums/contacted-property/type.enum';

export interface ContactedPropertyInterface {
  /**
   * The associated property id
   */
  propertyId: number;

  /**
   * Contact type
   */
  contactType: ContactedPropertyTypeEnum;

  /**
   * The contacted date
   */
  contactDate: string;
}
