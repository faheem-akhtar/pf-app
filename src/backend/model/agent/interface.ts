import { BackendModelBrokerInterface } from '../broker/interface';

export interface BackendModelAgentInterface {
  /**
   * ID
   * @example "2528"
   */
  id: string;

  /**
   * Name
   * @example "Ali Khamis"
   */
  name: string;

  /**
   * Email
   */
  email?: string;

  /**
   * Phone
   * @example "+97336111924"
   */
  phone: string;

  /**
   * Is mobile public phone?
   */
  phone_is_mobile: boolean;

  /**
   * Phone number assigned by PF (to track calls) - should be used instead of publicPhone
   */
  phone_did?: string | null;

  /**
   * Job position
   * @example "Agent"
   */
  position: string;

  /**
   * Nationality
   */
  nationality: string;

  /**
   * Ranking
   * @example 44
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
     * @example https://www.propertyfinder.bh/images/pf_agent/picture/da367a068fc789a45d4155084daa42105938d276/desktop
     */
    image_desktop?: string;
  };

  /**
   * Country name
   */
  country_name: string;

  /**
   * LinkedIn URL
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
   * @example 0
   */
  transactions_count: number;

  /**
   * Total number of properties
   * @exampel 59
   */
  total_properties: number;

  /**
   * Total number of properties residential for rent
   * @example 55
   */
  properties_residential_for_rent_count: number;

  /**
   * Total number of properties residential for sale
   * @example 1
   */
  properties_residential_for_sale_count: number;

  /**
   * Total number of commercial properties
   * @example 1
   */
  properties_commercial_count: number;

  /**
   * User id
   * @example "1986"
   */
  user_id: string;

  /**
   * Listing level
   * @example 44
   */
  listing_level: number;

  /**
   * Whether is smart ad
   */
  smart_ad: boolean;

  /**
   * Verification status
   * @example "incomplete"
   */
  verification_status: string;

  /**
   * Years of experience
   */
  years_of_experience: number | null;
}
