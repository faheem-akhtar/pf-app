import { LocationCompactInterface } from 'types/location/compact.interface';

import { PropertyContactOptionsListInterface } from '../contact-options-list.interface';
export interface PropertySerpInterface {
  /**
   * Live event
   */
  liveEvent: boolean;

  /**
   * Area in sqft
   */
  area: string;

  /**
   * Date the property was listed
   */
  publishDate: string;

  /**
   * Property ID
   */
  id: string;

  /**
   * Property Agent ID
   */
  agentId?: string;

  /**
   * Property Broker ID
   */
  brokerId?: string;

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
   * Location tree - compact
   */
  locationTreeCompact?: Partial<LocationCompactInterface>[];

  /**
   * insertion date
   */
  dateInsert: string;

  /**
   * Is this listing exclusive to the agent
   */
  exclusive: boolean;

  /**
   * Quality score
   */
  qualityScore: number;

  /**
   * Url to the listing
   */
  url: string;

  /**
   * Image url
   */
  imgUrl: string;

  /**
   * Image url small
   */
  imgUrlSmall: string;

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

  /**
   * Property reference ID
   */
  reference: string;

  /**
   * Price
   * Example: 110000
   */
  defaultPrice: number;

  /**
   * Size
   */
  size: number;

  /**
   * The completion status of the property
   */
  completionStatus: string | null;
}
