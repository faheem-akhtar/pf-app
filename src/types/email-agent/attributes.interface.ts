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

  /**
   * Whether the auto-register is needed or not
   */
  autoRegister: boolean;
}
