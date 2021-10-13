export interface TealiumPropertyStatsInterface {
  /**
   * Property Category
   */
  property_category: string;

  /**
   * Property sub category
   */
  property_sub_category: string;

  /**
   * Property completion
   */
  property_completion: string;

  /**
   * Property listed days
   */
  property_listed_days: string;

  /**
   * Property Id
   */
  property_listing_id: string;

  /**
   * LocationTree[0] Id
   */
  property_location0_id: string;

  /**
   * LocationTree[1] Id
   */
  property_location1_id: string;

  /**
   * LocationTree[2] Id
   */
  property_location2_id: string;

  /**
   * LocationTree[3] Id
   */
  property_location3_id: string;

  /**
   * LocationTree[4] Id
   */
  property_location4_id: string;

  /**
   * Property city
   */
  property_location_city: string;

  /**
   * Property community
   */
  property_location_community: string;

  /**
   * Property sub-community
   */
  property_location_sub_community: string;

  /**
   * Property tower
   */
  property_location_tower: string;

  /**
   * Property name
   */
  property_name: string;

  /**
   * Property price
   */
  property_price: string;

  /**
   * Property bathrooms
   */
  property_bathrooms: string;

  /**
   * Property bedrooms
   */
  property_bedrooms: string;

  /**
   * Property quality score
   */
  property_qs: string;

  /**
   * Property reference
   */
  property_reference: string;

  /**
   * Property rental period
   */
  property_rental_period: string;

  /**
   * Property size
   */
  property_size_sqft: string;

  /**
   * Property id as transaction id
   */
  property_transaction_id?: string;

  /**
   * Property type
   */
  property_type: string;

  /**
   * Property verification
   */
  property_verified_status: string;
}
