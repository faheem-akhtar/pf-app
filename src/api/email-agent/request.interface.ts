import { PropertyLeadInterface } from 'components/property/lead.interface';

export interface ApiEmailAgentRequestInterface extends PropertyLeadInterface {
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
