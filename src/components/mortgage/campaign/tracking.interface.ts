export interface MortgageCampaignTrackingInterface {
  /**
   * The source link
   * @example propertyfinder-mobile
   */
  source: string;

  /**
   * The tool of the campaign
   * @example pop-up
   */
  medium: string;

  /**
   * The name of the campaign
   * @example lead-confirmation
   */
  campaign: string;

  /**
   * The content of the campaign
   * @example get-pre-approved
   */
  content: string;
}
