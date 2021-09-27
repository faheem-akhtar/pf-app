import { PropertyLeadAttributesInterface } from 'types/property/lead/attributes.interface';

import { MortgageCampaignPropertyInterface } from './property.interface';

export interface MortgageCampaignComponentPropsInterface {
  /**
   * Property
   */
  property: MortgageCampaignPropertyInterface;

  /**
   * Lead attributes
   */
  leadModel: PropertyLeadAttributesInterface;
}
