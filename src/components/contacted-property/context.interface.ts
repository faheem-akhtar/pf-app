import { ContactedPropertyTypeEnum } from 'enums/contacted-property/type.enum';

import { ContactedPropertyInterface } from './interface';

export interface ContactedPropertyContextInterface {
  /**
   * Contacted properties
   */
  data: ContactedPropertyInterface[];

  /**
   * Mark the property contacted
   */
  add: (propertyId: number, contactType: ContactedPropertyTypeEnum) => void;
}
