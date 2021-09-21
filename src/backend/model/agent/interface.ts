import { BackendModelBrokerInterface } from '../broker/interface';

export interface BackendModelAgentInterface {
  /**
   * ID
   */
  id: string;

  /**
   * Name
   */
  name: string;

  /**
   * Email
   */
  email?: string;

  /**
   * Phone
   */
  phone: string;

  /**
   * Is mobile public phone ?
   */
  phone_is_mobile: boolean;

  /**
   * Phone number assigned by PF (to track calls) - should be used instead of publicPhone
   */
  phone_did?: string | null;

  /**
   * Job position
   */
  position: string;

  /**
   * Nationality
   */
  nationality: string;

  /**
   * Ranking
   */
  ranking: number;

  /**
   * Broker
   */
  broker?: BackendModelBrokerInterface;

  /**
   * Languages
   */
  languages?: { name: string }[];

  /**
   * Additional links
   */
  links: {
    /**
     * Profile URL
     */
    profile: string;

    /**
     * Image URL
     */
    image_desktop?: string;
  };

  /**
   * Country name
   */
  country_name: string;

  /**
   * LinkedIn URL
   *
   */
  linkedin_address: string;

  /**
   * Are agent's transactions visible
   */
  are_transactions_visible: boolean;

  /**
   * License number
   */
  agent_broker_license_no: string;

  /**
   * Total number of transactions in last 6 months
   */
  transactions_count: number;

  /**
   * Total number of properties
   */
  total_properties: number;

  /**
   * Total number of properties residential for rent
   */
  properties_residential_for_rent_count: number;

  /**
   * Total number of properties residential for sale
   */
  properties_residential_for_sale_count: number;

  /**
   * Total number of commercial properties
   */
  properties_commercial_count: number;

  /**
   * User id
   */
  user_id: string;

  /**
   * Listing level
   */
  listing_level: number;

  /**
   * Whether is smart ad
   */
  smart_ad: boolean;

  /**
   * Verification status
   */
  verification_status: string;

  /**
   * Years of experience
   */
  years_of_experience: number | null;
}
