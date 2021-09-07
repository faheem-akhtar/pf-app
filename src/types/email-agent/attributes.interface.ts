import { PropertyLeadAttributesInterface } from 'types/property/lead/attributes.interface';

export interface EmailAgentAttributesInterface extends PropertyLeadAttributesInterface {
  /**
   * Property id
   */
  propertyId: number;

  /**
   * Email alert
   */
  emailAlert: boolean;
}
