import { ContactedPropertyTypeEnum } from 'enums/contacted-property/type.enum';

export interface ContactedPropertyInterface {
  /**
   * ID
   */
  id: string;

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
