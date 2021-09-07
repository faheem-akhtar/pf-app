export interface EmailAlertAttributesInterface {
  /**
   * User's mail
   */
  email: string;

  /**
   * Amenities
   */
  amenities: string[];

  /**
   * Property category (rent, sale, etc.)
   */
  category_ids: number[];

  /**
   * Location id
   */
  location_ids: number[];

  /**
   * Property type (apartment, villa, hotel, ect.)
   */
  type_id: number;
}
