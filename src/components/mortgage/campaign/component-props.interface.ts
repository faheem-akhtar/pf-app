import { PropertyLeadInterface } from 'components/property/lead.interface';

import { MortgageCampaignPropertyInterface } from './property.interface';

export interface MortgageCampaignComponentPropsInterface {
  /**
   * Property
   */
  property: MortgageCampaignPropertyInterface;

  /**
   * Lead attributes
   */
  leadModel: PropertyLeadInterface;
}
