export type ConfigTealiumProfileType = {
  /**
   * Is Tealium enable
   */
  enabled: boolean;

  /**
   * The tealium PROFILE
   * @example //tags.tiqcdn.com/utag/ACCOUNT/PROFILE/ENVIRONMENT/utag.js
   */
  id: string | null;
};
