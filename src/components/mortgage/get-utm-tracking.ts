import { MortgageCampaignTrackingInterface } from './campaign/tracking.interface';

/**
 * Returns utm tracking url params for mortgage finder widgets
 */
export const mortgageGetUtmTracking = (
  options: MortgageCampaignTrackingInterface
): {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
} => ({
  utm_source: options.source,
  utm_medium: options.medium,
  utm_campaign: options.campaign,
  utm_content: options.content,
});
