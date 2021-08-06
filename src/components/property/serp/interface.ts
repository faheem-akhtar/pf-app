import { PropertyContactOptionsListInterface } from '../contact-options-list.interface';

export interface PropertySerpInterface {
  /**
   * Property ID
   */
  id: string;

  /**
   * Name
   * Example: "Upgraded | Custom Design | Full Sea View"
   */
  name: string;

  /**
   * Is this listing verified
   */
  verified: boolean;

  /**
   * Listing level
   * Example: "premium"
   */
  listingLevel: string;

  /**
   * Number of bathrooms
   */
  bathroomValue: number;

  /**
   * Number of bedrooms
   */
  bedroomValue: number;

  /**
   * Location tree page
   * Example: "Oceana Southern, Oceana, Palm Jumeirah, Dubai"
   */
  locationTreePath: string;

  /**
   * Is this listing exclusive to the agent
   */
  exclusive: boolean;

  /**
   * Url to the listing
   */
  url: string;

  /**
   * Image url
   */
  imgUrl: string;

  /**
   * Images count
   */
  imagesCount: number;

  /**
   * Property type name
   * Example: "Apartment"
   */
  propertyTypeName: string;

  /**
   * Contact options
   */
  contactOptionsList: PropertyContactOptionsListInterface;

  /**
   * Price text
   * Example: 110,000 درهم سنوياً
   */
  priceText: string;
}