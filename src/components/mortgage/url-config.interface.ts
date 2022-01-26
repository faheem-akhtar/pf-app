import { PropertyLeadInterface } from 'components/property/lead.interface';

import { MortgageCampaignTrackingInterface } from './campaign/tracking.interface';

export interface MortgageUrlConfigInterface {
  /**
   * Property price
   */
  propertyPrice: number;

  /**
   * Property reference
   */
  propertyReference: string;

  /**
   * Property id
   */
  propertyId: string;

  /**
   * Mortgage downpayment
   */
  downpayment?: number;

  /**
   * Mortgage term
   */
  term?: number;

  /**
   * Campaign Tracking config
   */
  utm: MortgageCampaignTrackingInterface;

  /**
   * Lead model attributes
   */
  leadModel: PropertyLeadInterface;
}
