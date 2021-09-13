import { BackendJsonApiModelType } from 'backend/json-api/model.type';

import { BackendModelBrokerClientTypeEnum } from './client-type.enum';

export interface BackendModelBrokerInterface extends BackendJsonApiModelType {
  /**
   * ID
   */
  id: string;

  /**
   * Name
   */
  name: string;

  /**
   * Phone
   */
  phone: string;

  /**
   * Address
   */
  address: string;

  /**
   * Ranking
   */
  ranking: number;

  /**
   * Total number of agents
   */
  agents: number;

  /**
   * Image token for the broker logo
   */
  logo_token: string;

  /**
   * Additional links
   */
  links: {
    /**
     * Profile URL
     */
    profile: string;

    /**
     * Logo small URL
     */
    logo_178_98: string;

    /**
     * Logo URL
     */
    logo_desktop: string;
  };

  /**
   * Label
   */
  license_label: string;

  /**
   * License number
   */
  license_number: string;

  /**
   * Location
   */
  location_name: string;

  /**
   * Client type
   */
  client_type: BackendModelBrokerClientTypeEnum;

  /**
   * URL slug
   */
  url_slug: string;

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
}
