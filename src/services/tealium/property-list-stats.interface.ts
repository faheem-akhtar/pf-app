import { TealiumEventInterface } from './event.interface';

export interface TealiumPropertyListStatsInterface extends Partial<TealiumEventInterface> {
  /**
   * Agent ids
   */
  properties_agent_id: string[];

  /**
   * Broker ids
   */
  properties_broker_id: string[];

  /**
   * Category ids
   */
  properties_category: string[];

  /**
   * Sub categories
   */
  properties_sub_category: string[];

  /**
   * Listing depths
   */
  properties_listing_depth: string[];

  /**
   * Property ids
   */
  properties_listing_id: string[];

  /**
   * LocationTree[0] Ids
   */
  properties_location0_id: string[];

  /**
   * LocationTree[1] Ids
   */
  properties_location1_id: string[];

  /**
   * LocationTree[2] Ids
   */
  properties_location2_id: string[];

  /**
   * LocationTree[3] Ids
   */
  properties_location3_id: string[];

  /**
   * LocationTree[4] Ids
   */
  properties_location4_id: string[];

  /**
   * Towers
   */
  properties_location_tower: string[];

  /**
   * Cities
   */
  properties_location_city: string[];

  /**
   * Communities
   */
  properties_location_community: string[];

  /**
   * Sub Communities
   */
  properties_location_sub_community: string[];

  /**
   * Names
   */
  properties_name: string[];

  /**
   * Prices
   */
  properties_price: string[];

  /**
   * Reference numbers
   */
  properties_reference: string[];

  /**
   * Rental periods
   */
  properties_rental_period: string[];

  /**
   * Sizes (sqft)
   */
  properties_size_sqft: string[];

  /**
   * Types
   */
  properties_type: string[];
}
