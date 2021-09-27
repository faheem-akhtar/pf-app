import { PropertyLeadAttributesInterface } from 'types/property/lead/attributes.interface';

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
  leadModel: PropertyLeadAttributesInterface;
}
