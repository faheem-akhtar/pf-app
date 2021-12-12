import { LocationCompactInterface } from 'types/location/compact.interface';

import { PropertyContactOptionsListInterface } from '../contact-options-list.interface';
import { PropertyVideoTourInterface } from '../video-tour.interface';

export interface PropertySerpInterface {
  /**
   * Live event
   * @example true/false
   */
  liveEvent: boolean;

  /**
   * Area in sqft
   * @example "489 sqm"
   */
  area: string;

  /**
   * Date the property was listed
   * @example "1 day ago"
   */
  publishDate: string;

  /**
   * Property ID
   * @example "540143"
   */
  id: string;

  /**
   * Property Agent ID
   */
  agentId?: string;

  /**
   * Property Broker ID
   * @example "14"
   */
  brokerId?: string;

  /**
   * Name
   * @example "Upgraded | Custom Design | Full Sea View"
   */
  name: string;

  /**
   * Is this listing verified
   * @example true/false
   */
  verified: boolean;

  /**
   * Listing level
   * @example "premium"
   */
  listingLevel: string;

  /**
   * Number of bathrooms
   * @example 5
   */
  bathroomValue: number;

  /**
   * Number of bedrooms
   * @example 4
   */
  bedroomValue: number;

  /**
   * Location tree page
   * @example "Oceana Southern, Oceana, Palm Jumeirah, Dubai"
   */
  locationTreePath: string;

  /**
   * Location tree - compact
   */
  locationTreeCompact?: Partial<LocationCompactInterface>[];

  /**
   * Insertion date
   * @example "Mon Dec 06 2021"
   */
  dateInsert: string;

  /**
   * Is this listing exclusive to the agent
   * @example true/false
   */
  exclusive: boolean;

  /**
   * Quality score
   * @example 100
   */
  qualityScore: number;

  /**
   * Url to the listing
   * @example "https://www.propertyfinder.bh/en/rent/apartment-for-rent-capital-governorate-al-juffair-540323.html"
   */
  url: string;

  /**
   * Image url
   * @example "https://www.propertyfinder.bh/property/63e4b6e5bfeae34d58d2a711eb9d028c/668/452/MODE/e68b06/540323-46a40o.jpg?ctr=bh"
   */
  imgUrl: string;

  /**
   * Image url small
   * @example "https://www.propertyfinder.bh/property/63e4b6e5bfeae34d58d2a711eb9d028c/260/185/MODE/aa4e7d/540323-46a40o.jpg?ctr=bh"
   */
  imgUrlSmall: string;

  /**
   * Images count
   * @example 10
   */
  imagesCount: number;

  /**
   * Property type name
   * @example "Apartment"
   */
  propertyTypeName: string;

  /**
   * Contact options
   */
  contactOptionsList: PropertyContactOptionsListInterface;

  /**
   * Price text
   * @example 110,000 درهم سنوياً
   */
  priceText: string;

  /**
   * Property reference ID
   * @example "SF-070p"
   */
  reference: string;

  /**
   * Price
   * @example 110000
   */
  defaultPrice: number;

  /**
   * Video tour data
   */
  videoTour?: PropertyVideoTourInterface;

  /**
   * Size
   * @example 80
   */
  size: number;

  /**
   * The completion status of the property
   */
  completionStatus: string | null;

  /**
   * Offering type or category identifier
   * @example "Residential for Rent"
   */
  offeringType: string;

  /**
   * The utilities price type (inclusive/exclusive)
   * @example "inclusive" | "exclusive"
   */
  utilitiesPriceType: string;
}
